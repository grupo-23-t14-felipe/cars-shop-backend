import { Request, Response } from "express";
import { createUserService } from "../services/users/createUsers.service";
import { ICar } from "../interfaces/cars.interfaces";
import { listCarByUserIdService } from "../services/users/listCarsByUserId.service";
import { updateUserService } from "../services/users/updateUsers.service";

export const createUserController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const newUser = await createUserService(req.body);
  return res.status(201).json(newUser);
};

export const listCarByUserIdController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const carList: ICar[] = await listCarByUserIdService(
    req.params.userUUID,
    req.user.uuid
  );
  return res.status(200).json(carList);
};

export const updateUserController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const updatedUser = await updateUserService(req.body, req.params.userUUID);
  return res.status(200).json(updatedUser);
};
