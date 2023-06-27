import { QueryBuilder } from "typeorm";
import { AppDataSource } from "../../data-source";
import { Car, User } from "../../entities";
import { ICar, ICarRepo, ICarReturn } from "../../interfaces/cars.interfaces";
import { IUserRepo } from "../../interfaces/user.interface";
import { MultipleCarResponseSchema } from "../../schemas/cars.schemas";

export const listCarByUserIdService = async (
  searchedUserUUID: string,
  loggedUserUUID: string | null
): Promise<any> => {
  const carRepository: ICarRepo = AppDataSource.getRepository(Car);
  const userRepository: IUserRepo = AppDataSource.getRepository(User);

  const searchedUser = await userRepository.findOneByOrFail({
    uuid: searchedUserUUID,
  });
  const queryBuilder = carRepository.createQueryBuilder("car");
  if (searchedUserUUID === loggedUserUUID) {
    const cars = await queryBuilder
      .leftJoinAndSelect("car.user", "user")
      .leftJoinAndSelect("car.gallery", "gallery") 
      .where("user.uuid = :searchedUserUUID", { searchedUserUUID })
      .getMany();

    const parsedCars = MultipleCarResponseSchema.parse(cars)
    return parsedCars;

  } else {
    const cars = await queryBuilder
    .leftJoinAndSelect("car.user", "user")
    .leftJoinAndSelect("car.gallery", "gallery") 
    .where("user.uuid = :searchedUserUUID", { searchedUserUUID })
    .andWhere("car.is_active = :isActive", { isActive: true })
    .getMany();
    
    const parsedCars = MultipleCarResponseSchema.parse(cars)
    return parsedCars;

  }
};
