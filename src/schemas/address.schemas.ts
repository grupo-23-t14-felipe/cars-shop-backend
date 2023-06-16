import { z } from "zod";

const AddressSchema = z.object({
  uuid: z.string(),
  cep: z.string().length(8),
  state: z.string().max(15),
  street: z.string(),
  city: z.string().max(50),
  number: z.string().max(8),
  complement: z.string().max(20).nullable().optional(),
});

const AddressCreateSchema = AddressSchema.omit({
  uuid: true,
});

export { AddressSchema, AddressCreateSchema };
