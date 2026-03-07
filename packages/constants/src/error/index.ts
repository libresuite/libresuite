const ERROR_MESSAGES = {
  METHOD_NOT_ALLOWED: {
    code: "METHOD_NOT_ALLOWED",
    message: "Method not allowed",
    status: 405,
  },
  INTERNAL_SERVER_ERROR: {
    code: "INTERNAL_SERVER_ERROR",
    message: "An unexpected error occurred on the server",
    status: 500,
  },
  NOT_FOUND: {
    code: "NOT_FOUND",
    message: "Requested resource not found on the server",
    status: 404,
  },
  BAD_REQUEST: {
    code: "BAD_REQUEST",
    message: "The request was invalid or cannot be served",
    status: 400,
  },
  UNAUTHORIZED: {
    code: "UNAUTHORIZED",
    message: "Authentication is required to access this resource",
    status: 401,
  },
  FORBIDDEN: {
    code: "FORBIDDEN",
    message: "The request was forbidden",
    status: 403,
  },
  SERVICE_UNAVAILABLE: {
    code: "SERVICE_UNAVAILABLE",
    message: "The service is currently unavailable",
    status: 503,
  },
};

export { ERROR_MESSAGES };
