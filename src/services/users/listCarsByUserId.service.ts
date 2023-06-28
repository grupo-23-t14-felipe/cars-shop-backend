import { AppDataSource } from "../../data-source";
import { Car, User } from "../../entities";
import { ICarRepo } from "../../interfaces/cars.interfaces";
import {
  IUserRepo,
  IUserResponseListCar,
} from "../../interfaces/user.interface";

import { UserResponseListCarsSchema } from "../../schemas/users.schemas";

export const listCarByUserIdService = async (
  searchedUserUUID: string,
  loggedUserUUID: string | null,
  page: number
): Promise<{ count: number; page: number; data: IUserResponseListCar }> => {
  const userRepository: IUserRepo = AppDataSource.getRepository(User);
  const carRepository: ICarRepo = AppDataSource.getRepository(Car);

  const searchedUser = await userRepository.findOneByOrFail({
    uuid: searchedUserUUID,
  });

  if (!page) page = 1;

  const itemsPerPage = 12;
  const offset = (page - 1) * itemsPerPage;

  const queryBuilder = userRepository.createQueryBuilder("user");
  const countQueryBuilder = carRepository.createQueryBuilder("cars");

  if (searchedUserUUID === loggedUserUUID) {
    const count = await countQueryBuilder
      .leftJoinAndSelect("cars.user", "user")
      .where("user.uuid = :searchedUserUUID", { searchedUserUUID })
      .getCount();

    const user = await queryBuilder
      .leftJoinAndSelect("user.cars", "cars")
      .leftJoinAndSelect("cars.gallery", "gallery")
      .where("user.uuid = :searchedUserUUID", { searchedUserUUID })
      .getOne();

    const parsedCars = UserResponseListCarsSchema.parse(user);

    return { count: count, page: page, data: parsedCars };
  } else {
    const count = await countQueryBuilder
      .leftJoinAndSelect("cars.user", "user")
      .where("user.uuid = :searchedUserUUID", { searchedUserUUID })
      .andWhere("cars.is_active = :isActive", { isActive: true })
      .getCount();

    const user = await queryBuilder
      .leftJoinAndSelect("user.cars", "cars")
      .leftJoinAndSelect("cars.gallery", "gallery")
      .where("user.uuid = :searchedUserUUID", { searchedUserUUID })
      .andWhere("cars.is_active = :isActive", { isActive: true })
      .skip(offset)
      .take(itemsPerPage)
      .getOne();

    const parsedCars = UserResponseListCarsSchema.parse(user);

    return { count: count, page: page, data: parsedCars };
  }
};
