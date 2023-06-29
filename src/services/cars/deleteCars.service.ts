import { AppDataSource } from "../../data-source";
import { Car } from "../../entities";
import { ICarRepo } from "../../interfaces/cars.interfaces";

export const deleteCarService = async (userUUID: string): Promise<void> => {
  const carRepository: ICarRepo = AppDataSource.getRepository(Car);
  const carToDelete: Car | null = await carRepository.findOneBy({ uuid: userUUID });

  await carRepository.remove(carToDelete!);
};
