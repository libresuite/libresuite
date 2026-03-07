import { ERROR_MESSAGES } from "@libresuite/constants";
import { type ApiError, type ApiResponse, GenericError } from "@libresuite/types";
import type { Response } from "express";

import returnApiResponse from "../return-api-response";

async function handleApiError(
  error: unknown,
  res: Response<ApiResponse<unknown>>,
): Promise<Response<ApiResponse<unknown>>> {
  if (error instanceof GenericError) {
    return returnApiResponse(res, {
      message: error.message,
      code: error.code,
      success: false,
      status: error.status,
    });
  }
  return returnApiResponse(res, {
    message: ERROR_MESSAGES.INTERNAL_SERVER_ERROR.message,
    code: ERROR_MESSAGES.INTERNAL_SERVER_ERROR.code,
    success: false,
    status: ERROR_MESSAGES.INTERNAL_SERVER_ERROR.status,
    errors: [error as ApiError],
  });
}

export default handleApiError;
