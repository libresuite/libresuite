import Env from "@libresuite/env";
import { express, logger, notFound } from "@libresuite/middlewares";
import type { ServiceConfig } from "@libresuite/types";

type EnvSchema = {
  NAME: string;
  HOST: string;
  PORT: string;
};

const env = new Env<EnvSchema>();

const config: ServiceConfig = {
  name: env.get("NAME", "string"),
  host: env.get("HOST", "string"),
  port: env.get("PORT", "number"),
  middlewares: {
    pre: [express],
    post: [logger, notFound],
  },
  routes: [],
};

export default config;
