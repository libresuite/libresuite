import { ExpressMiddleware, LoggerMiddleware, NotFoundMiddleware } from "@libresuite/middlewares";
import { register } from "@libresuite/utils";
import express, { type Application } from "express";

import { config } from "@/lib";

const app: Application = express();

const { name, routes } = config;

register({
  app,
  routes,
  middlewares: {
    pre: [ExpressMiddleware],
    post: [LoggerMiddleware, NotFoundMiddleware],
  },
  name,
});

export default app;
