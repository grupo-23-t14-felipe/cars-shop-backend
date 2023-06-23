import { AppDataSource } from "../../data-source";
import { User } from "../../entities";
import { IUserCreateRequest, IUserRepo } from "../../interfaces/user.interface";

export const updateUserService = async (
  payload: IUserCreateRequest,
  userUUID: string
) => {
  const userRepository: IUserRepo = AppDataSource.getRepository(User);

  const userToUpdate: User | null = await userRepository.findOneBy({
    uuid: userUUID,
  });

  const updatedUserInfo = {
    ...userToUpdate!,
    ...payload,
  };

  const updatedUser = userRepository.create(updatedUserInfo);
  await userRepository.save(updatedUser);

  return updatedUser;
};
