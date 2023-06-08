import { z } from 'zod';

const FuelType = z.enum(['hybrid', 'diesel', 'electric']);

const CarSchema = z.object({
  uuid: z.string().uuid(),
  brand: z.string().max(20),
  model: z.string().max(40),
  year: z.number().int().min(1886).max(new Date().getFullYear()),
  fuel_type: FuelType,
  mileage: z.number().int(),
  color: z.string().max(30),
  is_good_deal: z.boolean(),
  value: z.number().positive(),
  description: z.string(),
  user: z.object({}),
  comments: z.array(z.object({})), 
  galleries: z.array(z.object({})) 
})



export { CarSchema }
