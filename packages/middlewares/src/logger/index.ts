import _ from "@libresuite/logger";
import type { Middleware } from "@libresuite/types";
import type { NextFunction, Request, Response } from "express";

const logger: Middleware = {
  name: "logger",
  body: (request: Request, response: Response, next: NextFunction) => {
    const start = Date.now();
    response.on("finish", () => {
      const duration = Date.now() - start;
      _.info({
        message: {
          method: request.method,
          url: request.originalUrl,
          statusCode: response.statusCode,
          duration: duration,
        },
        owner: "logger",
        status: response.statusCode,
      });
    });
    return next();
  },
};

export default logger;
