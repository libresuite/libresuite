import Env from "@libresuite/env";
import type { ServiceConfig } from "@libresuite/types";

type EnvSchema = {
  NAME: string;
  HOST: string;
  PORT: string;
  KAFKA_BROKERS: string;
  DATABASE_URL: string;
};

const env = new Env<EnvSchema>();

const config: ServiceConfig = {
  name: env.get("NAME", "string"),
  host: env.get("HOST", "string"),
  port: env.get("PORT", "number"),
  kafkaBrokers: env.get("KAFKA_BROKERS", "string").split(","),
  databaseUrl: env.get("DATABASE_URL", "string"),
};

export default config;
