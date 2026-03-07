import type { Router } from "express";

import type Middleware from "./middleware";

type Route = {
  path: string;
  router: Router;
  middlewares?: {
    pre?: Middleware[];
    post?: Middleware[];
  };
};

export default Route;
