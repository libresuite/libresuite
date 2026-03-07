import type { Middleware } from "@libresuite/types";
import type { NextFunction, Request, Response } from "express";
import expressLib from "express";

const jsonParser = expressLib.json();
const urlencodedParser = expressLib.urlencoded({ extended: true });

const express: Middleware = {
  name: "express",
  body: (req: Request, res: Response, next: NextFunction) => {
    jsonParser(req, res, (err) => {
      if (err) return next(err);
      urlencodedParser(req, res, next);
    });
  },
};

export default express;
