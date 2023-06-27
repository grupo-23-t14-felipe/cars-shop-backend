import { AppDataSource } from "../../data-source";
import { User } from "../../entities";
import AppError from "../../errors/appError";
import { IUserRepo } from "../../interfaces/user.interface";
import { UserCreateResponseSchema } from "../../schemas/users.schemas";

export const resetPasswordService = async (
  newPassword: string,
  randomUUID: string
) => {
  const userRepository: IUserRepo = AppDataSource.getRepository(User);

  const userToUpdate: User | null = await userRepository.findOne({
    where:{
      reset_password: randomUUID,
    }
  });

  if (userToUpdate) {
    userToUpdate.password = newPassword

    await userRepository.save(userToUpdate)

    const parsedUser = UserCreateResponseSchema.parse(userToUpdate);

    return parsedUser
  }

  throw new AppError("User not found", 404)
};
