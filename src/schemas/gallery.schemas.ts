import z from "zod";
import { CarSchema } from "./cars.schemas";

export const gallerySchema = z.object({
  uuid: z.string().uuid(),
  imageUrl: z.string(),
  car: CarSchema,
});
