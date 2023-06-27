import { AppDataSource } from "../../data-source";
import { Comment } from "../../entities";
import AppError from "../../errors/appError";
import { ICommentRepo, ICommentResponse, ICommentUpdate } from "../../interfaces/comments.interface";

export const updateCommentService = async (
    payload: ICommentUpdate,
    userUUID: string,
    commentUUID: string,
  ): Promise<ICommentResponse> => {
    const commentRepository: ICommentRepo = AppDataSource.getRepository(Comment);  

    const comment: Comment | null = await commentRepository.findOne({
        where:{
            uuid: commentUUID
        },
        relations:{
          user:true,
          car: true
        }
    });

    if(!comment) throw new AppError("Comment not found", 404);
    if(comment.user.uuid !== userUUID) throw new AppError("You don't have permission to acess this service", 403);
    if(payload.description) comment.description = payload.description
  
    const updatedComment = await commentRepository.save(comment);
  
    const { description, user: { uuid: userId }, uuid: uuid, car: { uuid: carId } } = updatedComment;

    return {  uuid, description, userId, carId };
  };
  