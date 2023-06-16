import { AppDataSource } from "../../data-source";
import { Car, User } from "../../entities";
import { ICar, ICarRepo, ICarReturn } from "../../interfaces/cars.interfaces";
import { IUserRepo } from "../../interfaces/user.interface";

export const listCarByUserIdService = async (
  searchedUserUUID: string,
  loggedUserUUID: string | null
): Promise<any> => {
  const carRepository: ICarRepo = AppDataSource.getRepository(Car);
  const userRepository: IUserRepo = AppDataSource.getRepository(User);

  const searchedUser = await userRepository.findOneByOrFail({
    uuid: searchedUserUUID,
  });

  if (searchedUserUUID === loggedUserUUID) {
    const cars = carRepository.find({
      where: {
        user: {
          uuid: searchedUserUUID,
        },
      },
      relations: {
        user: true,
        comments: true,
        gallery: true,
      },
    });

    return cars;
  } else {
    const cars = carRepository.find({
      where: {
        user: {
          uuid: searchedUserUUID,
        },
        is_active: true,
      },
      relations: {
        user: true,
        comments: true,
        gallery: true,
      },
    });

    return cars;
  }
};
