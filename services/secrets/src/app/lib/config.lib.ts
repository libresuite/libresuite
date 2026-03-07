import Env from "@libresuite/env";
import type { ServiceConfig } from "@libresuite/types";

type EnvSchema = {
  NAME: string;
  HOST: string;
  PORT: string;
  KAFKA_BROKERS: string;
};

const env = new Env<EnvSchema>();

const config: ServiceConfig = {
  name: env.get("NAME", "string"),
  host: env.get("HOST", "string"),
  port: env.get("PORT", "number"),
  routes: [],
  kafkaBrokers: env.get("KAFKA_BROKERS", "string").split(","),
};

export default config;
