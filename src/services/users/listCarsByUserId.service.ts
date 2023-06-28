import { AppDataSource } from "../../data-source";
import { Car, User } from "../../entities";
import { ICarRepo } from "../../interfaces/cars.interfaces";
import {
  IUserRepo,
  IUserResponseListCar,
} from "../../interfaces/user.interface";
import { MultipleCarResponseSchema } from "../../schemas/cars.schemas";
import { UserResponseListCarsSchema } from "../../schemas/users.schemas";

export const listCarByUserIdService = async (
  searchedUserUUID: string,
  loggedUserUUID: string | null,
  page: number
): Promise<IUserResponseListCar> => {
  const carRepository: ICarRepo = AppDataSource.getRepository(Car);
  const userRepository: IUserRepo = AppDataSource.getRepository(User);

  const searchedUser = await userRepository.findOneByOrFail({
    uuid: searchedUserUUID,
  });

  if (!page) page = 1;

  const itemsPerPage = 12;
  const offset = (page - 1) * itemsPerPage;

  const queryBuilder = userRepository.createQueryBuilder("user");

  if (searchedUserUUID === loggedUserUUID) {
    const user = await queryBuilder
      .leftJoinAndSelect("user.cars", "cars")
      .leftJoinAndSelect("cars.gallery", "gallery")
      .where("user.uuid = :searchedUserUUID", { searchedUserUUID })
      .getOne();

    const parsedCars = UserResponseListCarsSchema.parse(user);

    return parsedCars;
  } else {
    const user = await queryBuilder
      .leftJoinAndSelect("user.cars", "cars")
      .leftJoinAndSelect("cars.gallery", "gallery")
      .where("user.uuid = :searchedUserUUID", { searchedUserUUID })
      .andWhere("cars.is_active = :isActive", { isActive: true })
      .getOne();

    const parsedCars = UserResponseListCarsSchema.parse(user);

    return parsedCars;
  }
};
