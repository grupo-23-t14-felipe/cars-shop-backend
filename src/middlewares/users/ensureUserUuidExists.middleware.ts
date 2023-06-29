import { NextFunction, Request, Response } from "express";
import { IUserRepo } from "../../interfaces/user.interface";
import { AppDataSource } from "../../data-source";
import { User } from "../../entities";
import AppError from "../../errors/appError";

export const ensureUserUuidExistsMdwr = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const userRepo: IUserRepo = AppDataSource.getRepository(User);
  const searchedUser: User | null = await userRepo.findOneBy({
    uuid: req.params.userUUID,
  });

  if (!searchedUser) {
    throw new AppError("User not found!", 404);
  }

  return next();
};
