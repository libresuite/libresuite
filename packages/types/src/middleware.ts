import type { NextFunction, Request, Response } from "express";

type Middleware = {
  name: string;
  body: (request: Request, response: Response, next: NextFunction) => void;
};

export default Middleware;
