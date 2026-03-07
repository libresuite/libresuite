import { ERROR_MESSAGES } from "@libresuite/constants";
import type { Middleware } from "@libresuite/types";
import { returnApiResponse } from "@libresuite/utils";
import type { NextFunction, Request, Response } from "express";

const notFound: Middleware = {
  name: "not-found",
  body: (_req: Request, res: Response, _next: NextFunction) => {
    return returnApiResponse(res, {
      message: ERROR_MESSAGES.NOT_FOUND.message,
      code: ERROR_MESSAGES.NOT_FOUND.code,
      success: false,
      status: ERROR_MESSAGES.NOT_FOUND.status,
    });
  },
};

export default notFound;
