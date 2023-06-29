import { compare } from "bcryptjs";
import jwt from "jsonwebtoken";
import { AppDataSource } from "../../data-source";
import { User } from "../../entities";
import AppError from "../../errors/appError";
import "dotenv/config";
import { IUserLogin, IUserLoginResponse, IUserRepo } from "../../interfaces/user.interface";
import { UserCreateResponseSchema, UserLoginResponseSchema } from "../../schemas/users.schemas";

const createSessionService = async (loginData: IUserLogin): Promise<IUserLoginResponse> => {
  const userRepository: IUserRepo = AppDataSource.getRepository(User);

  const user: User | null = await userRepository.findOne({
    where: {
      email: loginData.email
    },
    relations: {
      address: true
    }
  });

  if (!user) {
    throw new AppError("Invalid credentials", 401);
  }

  const passwordMatch = await compare(loginData.password, user.password);

  if (!passwordMatch) {
    throw new AppError("Invalid credentials", 401);
  }

  const userParsed = UserCreateResponseSchema.parse(user);

  const token: string = jwt.sign(
    {
      email: userParsed.email
    },
    process.env.SECRET_KEY!,
    {
      expiresIn: process.env.EXPIRES_IN,
      subject: String(user.uuid)
    }
  );
  const data = {
    token: token
  };
  const returnData = UserLoginResponseSchema.parse(data);

  return returnData;
};

export default createSessionService;
