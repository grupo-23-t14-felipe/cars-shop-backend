import { AppDataSource } from "../../data-source";
import { User } from "../../entities";
import { IUserRepo } from "../../interfaces/user.interface";

export const deleteUserService = async (userUUID: string): Promise<void> => {
  const userRepository: IUserRepo = AppDataSource.getRepository(User);
  const userToDelete: User | null = await userRepository.findOneBy({ uuid: userUUID });

  await userRepository.remove(userToDelete!);
};
