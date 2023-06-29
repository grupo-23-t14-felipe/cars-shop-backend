import { NextFunction, Request, Response } from "express";
import { IUserRepo } from "../../interfaces/user.interface";
import { AppDataSource } from "../../data-source";
import { User } from "../../entities";
import AppError from "../../errors/appError";

export const ensureUserHasPermissionMdwr = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
 
  const searchedUserId = req.params.userUUID

  const requestUserId = req.user.uuid

  if (searchedUserId !== requestUserId) {
    throw new AppError("Sorry, you do not have permission to access this resource.", 403);
  }

  return next();
};
