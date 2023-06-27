import { z } from "zod";
import { UserSchema } from "./users.schemas";
import { CarSchema } from "./cars.schemas";

const commentSchema = z.object({
  uuid: z.string(),
  addedIn: z.date(),
  description: z.string(),
  user: UserSchema,
  car: CarSchema
});

const commentCreateSchema = z.object({
  description: z.string()
})
const commentUpdateSchema = commentSchema.partial();

const commentResponse = z.object({
  description: z.string(), 
  userId: z.string(), 
  uuid: z.string(), 
  carId: z.string() 
})

export { commentSchema, commentCreateSchema, commentUpdateSchema, commentResponse };
