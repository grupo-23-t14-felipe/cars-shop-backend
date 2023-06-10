
import { z } from "zod";
import { CarSchema } from "./cars.schemas";
import { AddressCreateSchema } from "./address.schemas";

const UserSchema = z.object({
  uuid: z.string(),
  name: z.string().max(80),
  email: z.string().max(255),
  password: z.string().max(120),
  cpf: z.string().length(11),
  celphone: z.string().length(11),
  birthday: z.string().nullable().optional(),
  description: z.string().nullable().optional(),
  imageUrl: z.string().nullable().optional(),
  is_seller: z.boolean().nullable().optional(),
  address: z.string().optional(),
  cars: z.array(CarSchema).optional(),
  comments: z.array(
    z.object({})
  ).optional(),
});

const UserCreateRequestSchema = UserSchema.omit({
    uuid: true,
    comments: true,
    cars: true,
    address: true
}).extend({
  address: AddressCreateSchema
})
const UserCreateResponseSchema = UserSchema.omit({
  password:true
})
const UserRelatedSchema = UserSchema.omit({
    comments: true,
    cars: true,
    address: true
})
const UserLoginSchema = z.object({
  email: z.string(),
  password: z.string()
})
const UserLoginResponseSchema = z.object({
  user: UserCreateResponseSchema,
  token:z.string()
})

export { UserSchema,UserLoginResponseSchema, UserLoginSchema,UserRelatedSchema,UserCreateRequestSchema, UserCreateResponseSchema };
