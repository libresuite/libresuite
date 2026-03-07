import Env from "@libresuite/env";
import { express, logger, notFound } from "@libresuite/middlewares";
import type { GatewayConfig } from "@libresuite/types";
import cors from "cors";

type EnvSchema = {
  NAME: string;
  HOST: string;
  PORT: string;
  SECRETS_SERVICE_HOST: string;
  SECRETS_SERVICE_PORT: string;
  SECRETS_SERVICE_NAME: string;
  SECRETS_SERVICE_ROUTE: string;
};

const env = new Env<EnvSchema>();

const config: GatewayConfig = {
  name: env.get("NAME", "string"),
  host: env.get("HOST", "string"),
  port: env.get("PORT", "number"),
  services: [
    {
      host: env.get("SECRETS_SERVICE_HOST", "string"),
      port: env.get("SECRETS_SERVICE_PORT", "number"),
      name: env.get("SECRETS_SERVICE_NAME", "string"),
      route: env.get("SECRETS_SERVICE_ROUTE", "string"),
    },
  ],
  middlewares: {
    pre: [express, { name: "cors", body: cors() }],
    post: [logger, notFound],
  },
  routes: [],
  proxyOptions: {
    changeOrigin: true,
    timeout: 5000,
    proxyTimeout: 5000,
  },
  kafkaBrokers: [],
};

export default config;
