import { ERROR_MESSAGES } from "@libresuite/constants";
import type { Middleware } from "@libresuite/types";
import { returnApiResponse } from "@libresuite/utils";
import type { NextFunction, Request, Response } from "express";

const methodNotAllowed: Middleware = {
  body: (_request: Request, response: Response, _next: NextFunction) => {
    return returnApiResponse(response, {
      message: ERROR_MESSAGES.METHOD_NOT_ALLOWED.message,
      code: ERROR_MESSAGES.METHOD_NOT_ALLOWED.code,
      success: false,
      status: ERROR_MESSAGES.METHOD_NOT_ALLOWED.status,
    });
  },
  name: "method-not-allowed",
};

export default methodNotAllowed;
