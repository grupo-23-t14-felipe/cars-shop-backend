import { z } from "zod";
import {
  CarSchema,
  CarCreateRequestSchema,
  CarCreateSchema,
  CarUpdateRequestSchema,
  CarReturnSchema,
} from "../schemas/cars.schemas";
import { Repository } from "typeorm";
import { Car } from "../entities";

export type ICar = z.infer<typeof CarSchema>;
export type ICarReturn = z.infer<typeof CarReturnSchema>;
export type ICarCreateRequest = z.infer<typeof CarCreateRequestSchema>;
export type ICarCreate = z.infer<typeof CarCreateSchema>;
export type ICarUpdateRequest = z.infer<typeof CarUpdateRequestSchema>;
export type ICarRepo = Repository<Car>;
