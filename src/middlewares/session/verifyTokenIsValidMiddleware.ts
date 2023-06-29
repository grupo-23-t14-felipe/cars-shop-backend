import { Request, Response, NextFunction } from "express";
import AppError from "../../errors/appError";
import jwt from "jsonwebtoken";
import "dotenv/config";

const verifyTokenIsValidMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
): Response | void => {
  let token = req.headers.authorization;

  if (!token && req.originalUrl.includes(`users/cars/${req.params.userUUID}`)) {
    req.user = {
      uuid: ""
    };
    return next();
  }

  if (!token) {
    throw new AppError("Missing bearer token", 401);
  }

  token = token.split(" ")[1];

  jwt.verify(token, process.env.SECRET_KEY!, (error, decoded: any) => {
    if (error) {
      throw new AppError(error.message, 401);
    }

    req.user = {
      uuid: String(decoded.sub)
    };

    return next();
  });
};
export default verifyTokenIsValidMiddleware;
