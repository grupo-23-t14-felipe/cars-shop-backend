import { AppDataSource } from "../../data-source";
import { Comment } from "../../entities";
import AppError from "../../errors/appError";
import { ICommentRepo } from "../../interfaces/comments.interface";

export const deleteCommentService = async (commentUUID: string, userUUID: string) => {
  const commentRepository: ICommentRepo = AppDataSource.getRepository(Comment);

  const comment = await commentRepository.findOne({
    where: {
      uuid: commentUUID
    },
    relations: {
      user: true
    }
  });

  if (!comment) {
    throw new AppError("Comment not found", 404);
  }

  if (comment.user.uuid !== userUUID) {
    throw new AppError("You don't have permission to access this service", 403);
  }

  await commentRepository.delete(commentUUID);
};
