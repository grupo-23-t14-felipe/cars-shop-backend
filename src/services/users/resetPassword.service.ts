import { AppDataSource } from "../../data-source";
import { User } from "../../entities";
import AppError from "../../errors/appError";
import { IUserRepo } from "../../interfaces/user.interface";

export const resetPasswordService = async (newPassword: string, randomUUID: string) => {
  const userRepository: IUserRepo = AppDataSource.getRepository(User);

  const userToUpdate: User | null = await userRepository.findOne({
    where: {
      reset_password: randomUUID
    }
  });

  if (userToUpdate) {
    const updatedUserInfo = {
      ...userToUpdate!,
      password: newPassword
    };

    const updatedUser = userRepository.create(updatedUserInfo);
    await userRepository.save(updatedUser);

    return updatedUser;
  }

  throw new AppError("User not found", 404);
};
