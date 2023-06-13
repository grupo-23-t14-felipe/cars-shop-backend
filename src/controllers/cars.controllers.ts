import { Request, Response } from "express";
import listCarsService from "../services/cars/listCars.service";
import { createCarService } from "../services/cars/createCars.service";
import { updateCarService } from "../services/cars/updateCars.service";
import { deleteCarService } from "../services/cars/deleteCars.service";

export const createCarController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const carCreated = await createCarService(req.body, req.user.uuid);
  return res.status(201).json(carCreated);
};

export const listCarsController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const cars = await listCarsService();
  return res.status(200).json(cars);
};

export const listUserCarsController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const userCars = await res.locals.userCars;
  return res.status(200).json(userCars);
};

export const updateCarController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const updatedCar = await updateCarService(req.body, req.params.uuid);
  return res.status(200).json(updatedCar);
};

export const deleteCarController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  await deleteCarService(req.params.uuid);
  return res.status(204).send();
};
