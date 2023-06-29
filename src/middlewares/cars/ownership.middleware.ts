import { Request, Response, NextFunction } from "express";
import { Car } from "../../entities";
import { AppDataSource } from "../../data-source";
import { ICarRepo } from "../../interfaces/cars.interfaces";

export const checkOwnershipMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  const userUUID: string = String(req.user.uuid);
  const carUUID: string = String(req.params.carUUID);

  const carRepository: ICarRepo = AppDataSource.getRepository(Car);
  const car = await carRepository.findOne({
    where: { uuid: carUUID },
    relations: ["user"]
  });

  if (!car || !car.user || car.user.uuid !== userUUID) {
    return res.status(403).json({ message: "Unauthorized" });
  }

  next();
};
