import { Repository } from "typeorm";
import { Address } from "../entities";
import { z } from "zod";
import { AddressCreateSchema, AddressSchema } from "../schemas/address.schemas";

export type IAddressRepo = Repository<Address>

export type IAddress = z.infer<typeof AddressSchema>
export type IAddressCreateRequest = z.infer<typeof AddressCreateSchema>
