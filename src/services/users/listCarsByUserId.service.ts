import { AppDataSource } from "../../data-source";
import { Car, User } from "../../entities";
import AppError from "../../errors/appError";
import { ICarRepo } from "../../interfaces/cars.interfaces";
import { IUserRepo, IUserResponseListCar } from "../../interfaces/user.interface";

import { UserResponseListCarsSchema } from "../../schemas/users.schemas";

export const listCarByUserIdService = async (
  searchedUserUUID: string,
  loggedUserUUID: string | null,
  page: number
): Promise<{ count: number; page: number; data: IUserResponseListCar }> => {
  const userRepository: IUserRepo = AppDataSource.getRepository(User);
  const carRepository: ICarRepo = AppDataSource.getRepository(Car);

  const queryBuilder = userRepository.createQueryBuilder("user");
  const countQueryBuilder = carRepository.createQueryBuilder("car");

  const find = await userRepository.findOne({
    where: {
      uuid: searchedUserUUID
    }
  });

  if (!find) throw new AppError("User not found.", 404);

  if (!page) page = 1;

  const itemsPerPage = 12;
  const offset = (page - 1) * itemsPerPage;

  if (searchedUserUUID === loggedUserUUID) {
    const count = await countQueryBuilder
      .leftJoinAndSelect("car.user", "user")
      .where("user.uuid = :searchedUserUUID", { searchedUserUUID })
      .getCount();

    const cars = await carRepository
      .createQueryBuilder("car")
      .leftJoinAndSelect("car.gallery", "g")
      .leftJoinAndSelect("car.user", "user")
      .skip(offset)
      .take(itemsPerPage)
      .getMany();

    const user = { ...find, cars: cars };

    const parsedCars = UserResponseListCarsSchema.parse(user);

    return { count: count, page: page, data: parsedCars };
  } else {
    const count = await countQueryBuilder
      .leftJoinAndSelect("car.user", "user")
      .where("user.uuid = :searchedUserUUID", { searchedUserUUID })
      .andWhere("cars.is_active = :isActive", { isActive: true })
      .getCount();

    const cars = await carRepository
      .createQueryBuilder("car")
      .leftJoinAndSelect("car.gallery", "g")
      .leftJoinAndSelect("car.user", "user")
      .where("car.is_active = :isActive", { isActive: true })
      .andWhere("user.uuid = :searchedUserUUID", { searchedUserUUID })
      .skip(offset)
      .take(itemsPerPage)
      .getMany();

    const user = { ...find, cars: cars };

    const parsedCars = UserResponseListCarsSchema.parse(user);

    return { count: count, page: page, data: parsedCars };
  }
};
