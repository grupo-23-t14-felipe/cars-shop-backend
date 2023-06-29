import { Request, Response } from "express";
import { createCommentService } from "../services/comments/createComment.service";
import { updateCommentService } from "../services/comments/updateComment.service";
import { deleteCommentService } from "../services/comments/deleteComment.service";

export const createCommentController = async (req: Request, res: Response): Promise<Response> => {
  const comment = await createCommentService(req.body, req.user.uuid, req.params.carUUID);
  return res.status(201).json(comment);
};
export const updateCommentController = async (req: Request, res: Response): Promise<Response> => {
  const comment = await updateCommentService(req.body, req.user.uuid, req.params.commentUUID);
  return res.status(201).json(comment);
};
export const deleteCommentController = async (req: Request, res: Response): Promise<Response> => {
  await deleteCommentService(req.params.commentUUID, req.user.uuid);
  return res.status(204).send();
};
