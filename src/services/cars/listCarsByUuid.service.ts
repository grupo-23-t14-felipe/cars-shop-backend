import { ICarRepo, ICarReturn } from "../../interfaces/cars.interfaces";
import { Car } from "../../entities";
import { AppDataSource } from "../../data-source";
import AppError from "../../errors/appError";

const retrieveCarService = async (uuid: string): Promise<Car> => {
  const carRepository: ICarRepo = AppDataSource.getRepository(Car);

  const find = await carRepository.findOne({
    where: {
      uuid: uuid,
    },
    relations: {
      user: true,
      gallery: true,
      comments: {
        user: true,
      },
    },
  });

  if (find === null) {
    throw new AppError("Car not found.", 404);
  }

  return find;
};

export default retrieveCarService;
