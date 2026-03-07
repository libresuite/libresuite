import path from "node:path";
import dotenv from "dotenv";
import type { EnvLoadOptions, EnvSchema } from "@/types";

class Env<T extends EnvSchema> {
  private env: T = {} as T;
  constructor(
    private cwd = process.cwd(),
    { dotenvOverride = false, quiet = true }: EnvLoadOptions = {},
  ) {
    this.load({ dotenvOverride, quiet });
  }

  load({ dotenvOverride = false, quiet = true }: EnvLoadOptions = {}) {
    try {
      const NODE_ENV = process.env.NODE_ENV || "development";
      const DOTENV_PATH = path.resolve(this.cwd, `.env.${NODE_ENV}`);

      dotenv.config({
        path: DOTENV_PATH,
        override: dotenvOverride,
        quiet,
      });

      this.env = process.env as T;
    } catch {
      throw new Error("Failed to load environment variables");
    }
  }

  get<K extends keyof T>(key: K): string;
  get<K extends keyof T>(key: K, type: "string"): string;
  get<K extends keyof T>(key: K, type: "number"): number;
  get<K extends keyof T>(key: K, type: "boolean"): boolean;
  get<K extends keyof T>(key: K, type?: "string" | "number" | "boolean"): string | number | boolean {
    const value = this.env[key];
    if (value === undefined) {
      throw new Error(`Environment variable ${String(key)} is not set`);
    }
    const raw = String(value);
    if (type === "number") return Number(raw);
    if (type === "boolean") return raw !== "false" && raw !== "0" && raw !== "";
    return raw;
  }
}

export default Env;
