import { z } from "zod"
import { CarSchema } from "../schemas/cars.schemas"

export type ICar = z.infer<typeof CarSchema>