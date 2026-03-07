import { register } from "@libresuite/utils";
import express, { type Application } from "express";

import { config } from "@/lib";
import { createServiceProxy } from "@/utils";

const app: Application = express();

const { name, routes, services, middlewares } = config;

register({
  app,
  routes,
  middlewares,
  services,
  name,
  createServiceProxy,
});

export default app;
