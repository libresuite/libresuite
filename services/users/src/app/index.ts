import { ExpressMiddleware, LoggerMiddleware, NotFoundMiddleware } from "@libresuite/middlewares";
import { register } from "@libresuite/utils";
import express, { type Application } from "express";

import { config } from "@/lib";
import UsersRoute from "@/routes";

const app: Application = express();

const { name } = config;

register({
  app,
  routes: [UsersRoute],
  middlewares: {
    pre: [ExpressMiddleware],
    post: [LoggerMiddleware, NotFoundMiddleware],
  },
  name,
});

export default app;
