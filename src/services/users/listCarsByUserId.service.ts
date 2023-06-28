import { AppDataSource } from "../../data-source";
import { User } from "../../entities";
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

  const searchedUser = await userRepository.findOneByOrFail({
    uuid: searchedUserUUID,
  });

  if (!page) page = 1;

  const itemsPerPage = 12;
  const offset = (page - 1) * itemsPerPage;

  const queryBuilder = userRepository.createQueryBuilder("user");

  if (searchedUserUUID === loggedUserUUID) {
    const countQueryBuilder = await queryBuilder
      .leftJoinAndSelect("user.cars", "cars")
      .leftJoinAndSelect("cars.gallery", "gallery")
      .where("user.uuid = :searchedUserUUID", { searchedUserUUID })
      .skip(offset)
      .take(itemsPerPage)
      .getCount();

    const user = await queryBuilder
      .leftJoinAndSelect("user.cars", "cars")
      .leftJoinAndSelect("cars.gallery", "gallery")
      .where("user.uuid = :searchedUserUUID", { searchedUserUUID })
      .getOne();

    const parsedCars = UserResponseListCarsSchema.parse(user);

    return { count: countQueryBuilder, page: page, data: parsedCars };
  } else {
    const countQueryBuilder = await queryBuilder
      .leftJoinAndSelect("user.cars", "cars")
      .leftJoinAndSelect("cars.gallery", "gallery")
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

    return { count: countQueryBuilder, page: page, data: parsedCars };
  }
};
