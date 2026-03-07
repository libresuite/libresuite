import { register } from "@libresuite/utils";
import express, { type Application } from "express";
import { config } from "@/lib";

const app: Application = express();

const { name, routes, middlewares } = config;

register({
  app,
  routes,
  middlewares,
  name,
});

export default app;
