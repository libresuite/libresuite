import type ApiError from "./api-error";

type ApiResponse<T> = {
  id: string;
  message?: string;
  code: string;
  data?: T;
  success: boolean;
  timestamp: Date;
  errors?: ApiError[];
  status: number;
};

export default ApiResponse;
