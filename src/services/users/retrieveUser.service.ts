import { AppDataSource } from "../../data-source";
import { User } from "../../entities";
import { IUserRepo, IUserResponse } from "../../interfaces/user.interface";
import { UserCreateResponseSchema } from "../../schemas/users.schemas";

export const retrieveUserService = async (
  userUUID: string
): Promise<IUserResponse> => {
  const userRepository: IUserRepo = AppDataSource.getRepository(User);
  const user: User | null = await userRepository.findOne({
    where: {
      uuid: userUUID,
    },
    relations: {
      cars: true,
      address: true,
    },
  });
  console.log(user);

  const parsedUser = UserCreateResponseSchema.parse(user);

  return parsedUser;
};
