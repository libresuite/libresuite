import type Middleware from "./middleware";
import type { Router } from "express";

type Route = {
  path: string;
  router: Router;
  middlewares?: {
    pre?: Middleware[];
    post?: Middleware[];
  };
};

export default Route;
