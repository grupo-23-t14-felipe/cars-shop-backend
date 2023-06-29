import { AppDataSource } from "../../data-source";
import { Car, Comment, User } from "../../entities";
import AppError from "../../errors/appError";
import { ICarRepo } from "../../interfaces/cars.interfaces";
import {
  ICommentCreate,
  ICommentRepo,
  ICommentResponse
} from "../../interfaces/comments.interface";
import { IUserRepo } from "../../interfaces/user.interface";

export const createCommentService = async (
  payload: ICommentCreate,
  userUUID: string,
  carUUID: string
): Promise<ICommentResponse> => {
  const carRepository: ICarRepo = AppDataSource.getRepository(Car);
  const commentRepository: ICommentRepo = AppDataSource.getRepository(Comment);
  const userRepository: IUserRepo = AppDataSource.getRepository(User);

  const car: Car | null = await carRepository.findOne({
    where: {
      uuid: carUUID
    }
  });

  const user: User | null = await userRepository.findOne({
    where: {
      uuid: userUUID
    }
  });

  if (!car) throw new AppError("Car not found", 404);
  if (!user) throw new AppError("User not found", 404);

  const newComment = {
    ...payload,
    car: car,
    user: user
  };

  const createdComment = commentRepository.create(newComment);

  const savedComment = await commentRepository.save(createdComment);

  const {
    description,
    user: { uuid: userId },
    uuid: uuid,
    car: { uuid: carId }
  } = savedComment;

  return { uuid, description, userId, carId };
};
