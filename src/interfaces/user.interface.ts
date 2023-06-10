import { Repository } from "typeorm";
import { User } from "../entities";
import { z } from "zod";
import { UserCreateRequestSchema, UserCreateResponseSchema, UserSchema } from "../schemas/users.schemas";

export type IUserRepo = Repository<User>

export type IUser = z.infer<typeof UserSchema>
export type IUserCreateRequest = z.infer<typeof UserCreateRequestSchema>
export type IUserResponse = z.infer<typeof UserCreateResponseSchema>