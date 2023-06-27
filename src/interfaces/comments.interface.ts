import { Repository } from "typeorm";
import { Comment } from "../entities";
import { z } from "zod";
import { commentCreateSchema, 
         commentResponse,  
         commentUpdateSchema } from "../schemas/comments.schemas";

export type ICommentRepo = Repository<Comment>
export type ICommentCreate = z.infer<typeof  commentCreateSchema>
export type ICommentUpdate = z.infer<typeof commentUpdateSchema>
export type ICommentResponse = z.infer<typeof commentResponse>