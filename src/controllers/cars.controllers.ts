import { Request, Response } from "express";
import { createCarService } from "../services/cars/createCars.service";
import { updateCarService } from "../services/cars/updateCars.service";
import { deleteCarService } from "../services/cars/deleteCars.service";
import listCarsService from "../services/cars/listCars.service";
import retrieveCarService from "../services/cars/retrieveCars.service";

export const createCarController = async (req: Request, res: Response): Promise<Response> => {
  const carCreated = await createCarService(req.body, req.user.uuid);
  return res.status(201).json(carCreated);
};

export const listCarsController = async (req: Request, res: Response): Promise<Response> => {
  const filters = req.query;
  const page = Number(req.query.page);
  const cars = await listCarsService(page, filters);
  return res.status(200).json(cars);
};

export const listCarByUuidController = async (req: Request, res: Response): Promise<Response> => {
  const uuid = req.params.carUUID;
  const cars = await retrieveCarService(uuid);
  return res.status(200).json(cars);
};

export const updateCarController = async (req: Request, res: Response): Promise<Response> => {
  const updatedCar = await updateCarService(req.body, req.params.carUUID);
  return res.status(200).json(updatedCar);
};

export const deleteCarController = async (req: Request, res: Response): Promise<Response> => {
  await deleteCarService(req.params.carUUID);
  return res.status(204).send();
};
