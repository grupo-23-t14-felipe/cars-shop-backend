import { AppDataSource } from "../../data-source";
import { User, Address } from "../../entities";
import { IAddressRepo } from "../../interfaces/address.interfaces";
import {
  IUserCreateRequest,
  IUserRepo,
  IUserResponse,
} from "../../interfaces/user.interface";
import { UserCreateResponseSchema } from "../../schemas/users.schemas";

export const createUserService = async (
  userData: IUserCreateRequest
): Promise<IUserResponse> => {
  const addressRepository: IAddressRepo = AppDataSource.getRepository(Address);
  const userRepository: IUserRepo = AppDataSource.getRepository(User);

  const newAddress = addressRepository.create(userData.address);
  const savedAddress = await addressRepository.save(newAddress);

  const newUser = userRepository.create({
    ...userData,
    address: savedAddress,
  });

  const savedUser = await userRepository.save(newUser);

  const returnUser = UserCreateResponseSchema.parse(savedUser);

  return returnUser;
};
