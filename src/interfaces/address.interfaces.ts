import { Repository } from "typeorm";
import { Address } from "../entities";
import { z } from "zod";
import { AddressCreateSchema, AddressSchema, AddressUpdateSchema } from "../schemas/address.schemas";

export type IAddressRepo = Repository<Address>

export type IAddress = z.infer<typeof AddressSchema>
export type IAddressCreateRequest = z.infer<typeof AddressCreateSchema>
export type IAdressUpdate = z.infer<typeof AddressUpdateSchema>