import {
  ExpressMiddleware,
  LoggerMiddleware,
  MethodNotAllowedMiddleware,
  NotFoundMiddleware,
} from "@libresuite/middlewares";
import { register } from "@libresuite/utils";
import cors from "cors";
import express, { type Application } from "express";

import { config } from "@/lib";
import { createServiceProxy } from "@/utils";

const app: Application = express();

const { name, routes, services } = config;

register({
  app,
  routes,
  middlewares: {
    pre: [ExpressMiddleware, { name: "cors", body: cors() }],
    post: [NotFoundMiddleware, MethodNotAllowedMiddleware, LoggerMiddleware],
  },
  services,
  name,
  createServiceProxy,
});

export default app;
