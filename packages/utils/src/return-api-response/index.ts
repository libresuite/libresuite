import { randomUUID } from "node:crypto";
import { SUCCESS_MESSAGES } from "@libresuite/constants";
import type { ApiError, ApiResponse } from "@libresuite/types";
import type { Response } from "express";

async function returnApiResponse(
  res: Response<ApiResponse<unknown>>,
  payload: {
    message?: string;
    code?: string;
    success?: boolean;
    data?: unknown;
    errors?: ApiError[];
    status?: number;
  },
) {
  const _payload: ApiResponse<unknown> = {
    id: randomUUID(),
    code: payload.code ?? SUCCESS_MESSAGES.OK.code,
    status: payload.status ?? SUCCESS_MESSAGES.OK.status,
    message: payload.message ?? SUCCESS_MESSAGES.OK.message,
    success: payload.success ?? true,
    timestamp: new Date(),
    data: payload.data,
    errors: payload.errors,
  };
  return res.status(_payload.status).json(_payload);
}

export default returnApiResponse;
