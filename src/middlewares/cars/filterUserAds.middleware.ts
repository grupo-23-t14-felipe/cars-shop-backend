import { Request, Response, NextFunction } from "express";
import { Car } from "../../entities";
import { AppDataSource } from "../../data-source";

const listUserCarsMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!req.user || !req.user.uuid) {
    return res.status(400).json({ message: "invalid user" });
  }

  const userId = req.user.uuid;

  const carRepository = AppDataSource.getRepository(Car);
  const cars = await carRepository.find({
    where: {
      user: {
        uuid: userId,
      },
    },
    relations: ["user", "comments", "galleries"],
  });

  res.locals.userCars = cars;
  next();
};

export default listUserCarsMiddleware;
