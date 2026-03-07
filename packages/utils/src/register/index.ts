import logger from "@libresuite/logger";
import type { Middleware, Route, Service } from "@libresuite/types";
import type { Application } from "express";

type RegisterOptions = {
  app: Application;
  routes?: Route[];
  middlewares?: {
    pre: Middleware[];
    post: Middleware[];
  };
  services?: Service[];
  // TODO:
  /**
   * For gateway only, will be fixed later, or not, I don't know.
   */
  // biome-ignore lint/complexity/noBannedTypes: will be fixed later
  createServiceProxy?: Function;
  name: string;
};

function register(options: RegisterOptions) {
  options.middlewares?.pre.forEach((middleware) => {
    logger.debug({
      message: `Pre-proxy middleware ${middleware.name} registered`,
      owner: options.name,
    });
    options.app.use(middleware.body);
  });

  options.routes?.forEach((route) => {
    route.middlewares?.pre?.forEach((middleware) => {
      logger.debug({
        message: `Pre-proxy middleware ${middleware.name} registered for ${route.path} route`,
        owner: options.name,
      });
      options.app.use(middleware.body);
    });
    logger.debug({
      message: `Route ${route.path} registered`,
      owner: options.name,
    });
    options.app.use(route.router);
    route.middlewares?.post?.forEach((middleware) => {
      logger.debug({
        message: `Post-proxy middleware ${middleware.name} registered for ${route.path} route`,
        owner: options.name,
      });
      options.app.use(middleware.body);
    });
  });

  options.services?.forEach((service) => {
    if (!options.createServiceProxy) {
      throw new Error("createServiceProxy is required for gateway.");
    }
    logger.debug({
      message: `Service ${service.name} registered`,
      owner: options.name,
    });
    options.app.use(service.route, options.createServiceProxy(service));
  });

  options.middlewares?.post.forEach((middleware) => {
    logger.debug({
      message: `Post-proxy middleware ${middleware.name} registered`,
      owner: options.name,
    });
    options.app.use(middleware.body);
  });
}

export default register;
