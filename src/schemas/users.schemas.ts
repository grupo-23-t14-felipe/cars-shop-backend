import { z } from "zod";
import { AddressCreateSchema, AddressSchema } from "./address.schemas";

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
  address: AddressSchema.optional(),
  reset_password: z.string().optional().nullable(),
  cars: z
    .array(
      z.object({
        uuid: z.string(),
        brand: z.string(),
        model: z.string(),
        year: z.number(),
        fuel_type: z.string(),
        mileage: z.number(),
        color: z.string(),
        is_good_deal: z.boolean(),
        is_active: z.boolean(),
        value: z.string(),
        description: z.string(),
        img_default: z.string(),
        gallery: z.array(
          z.object({
            uuid: z.string(),
            imageUrl: z.string()
          })
        )
      })
    )
    .optional(),
  comments: z.array(z.object({})).optional()
});

const UserCreateRequestSchema = UserSchema.omit({
  uuid: true,
  comments: true,
  cars: true,
  address: true
}).extend({
  address: AddressCreateSchema
});
const UserCreateResponseSchema = UserSchema.omit({
  cars: true,
  password: true
});
const UserRelatedSchema = UserSchema.omit({
  comments: true,
  cars: true,
  address: true
});
const UserLoginSchema = z.object({
  email: z.string(),
  password: z.string()
});
const UserLoginResponseSchema = z.object({
  token: z.string()
});

const UserUpdateRequestSchema = UserCreateRequestSchema.partial();

const UserResponseListCarsSchema = UserSchema.omit({
  password: true,
  reset_password: true,
  address: true,
  comments: true
}).extend({
  cars: z.array(
    z
      .object({
        user: UserRelatedSchema.omit({
          password: true,
          reset_password: true
        })
      })
      .nonstrict()
  )
});

const UserResponseSchema = UserSchema.omit({
  password: true,
  comments: true,
  cars: true,
  address: true,
  cpf: true,
  birthday: true,
  is_seller: true,
  reset_password: true,
  email: true
});

export {
  UserSchema,
  UserLoginResponseSchema,
  UserLoginSchema,
  UserRelatedSchema,
  UserResponseSchema,
  UserCreateRequestSchema,
  UserCreateResponseSchema,
  UserUpdateRequestSchema,
  UserResponseListCarsSchema
};
