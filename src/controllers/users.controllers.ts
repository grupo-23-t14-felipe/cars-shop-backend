import { Request, Response } from "express";
import { createUserService } from "../services/users/createUsers.service";
import { ICar } from "../interfaces/cars.interfaces";
import { listCarByUserIdService } from "../services/users/listCarsByUserId.service";
import { updateUserService } from "../services/users/updateUsers.service";
import { deleteUserService } from "../services/users/deleteUser.service";
import sendEmailService from "../services/users/getUserEmail.service";
import { retrieveUserService } from "../services/users/retrieveUser.service";
import { updateAddressService } from "../services/address/updateAddress.service";
import { resetPasswordService } from "../services/users/resetPassword.service";

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

export const deleteUserController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  await deleteUserService(req.params.userUUID);
  return res.status(204).send();
};

export const sendEmailController = async (
  req: Request,
  res: Response
): Promise<Response> => {
const message = await sendEmailService(req.body.email);
  return res.status(200).send(message);
};

export const retrieveUserController = async (
  req: Request,
  res: Response
): Promise<Response> => {
const userId = req.params.userUUID
const user =  await retrieveUserService(userId);
  return res.status(200).json(user);
};

export const updateAddressController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const updatedAddress = await updateAddressService(req.body, req.params.userUUID);
  return res.status(201).json(updatedAddress);
};

export const resetPasswordController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const user = await resetPasswordService(req.body.new_password, req.params.randomUUID);
  return res.status(200).json(user);
};