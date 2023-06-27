import { ICarRepo, ICarRetrieve, ICarReturn } from "../../interfaces/cars.interfaces";
import { Car } from "../../entities";
import { AppDataSource } from "../../data-source";
import AppError from "../../errors/appError";
import { retrieveCarSchema } from "../../schemas/cars.schemas";

const retrieveCarService = async (uuid: string): Promise<ICarRetrieve> => {
  const carRepository: ICarRepo = AppDataSource.getRepository(Car);

  const find = await carRepository.findOne({
    where: {
      uuid: uuid,
    },
    relations: {
      user: true,
      gallery: true,
      comments: true,
    },
  });

  if (find === null) {
    throw new AppError("Car not found.", 404);
  }

  const parsedCar = retrieveCarSchema.parse(find)
  
  return parsedCar;
};

export default retrieveCarService;
