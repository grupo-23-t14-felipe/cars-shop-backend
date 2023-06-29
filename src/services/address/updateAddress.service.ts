import { AppDataSource } from "../../data-source";
import { Address, User } from "../../entities";
import AppError from "../../errors/appError";
import { IAddress, IAddressRepo } from "../../interfaces/address.interfaces";
import { IUserRepo } from "../../interfaces/user.interface";

export const updateAddressService = async (payload: IAddress, userUUID: string) => {
  const userRepository: IUserRepo = AppDataSource.getRepository(User);
  const addressRepository: IAddressRepo = AppDataSource.getRepository(Address);

  const user = await userRepository.findOne({
    where: {
      uuid: userUUID
    },
    relations: {
      address: true
    }
  });

  if (!user) {
    throw new AppError("User not found!", 404);
  }

  const addressUUID = user.address.uuid;

  const addressToUpdate: Address | null = await addressRepository.findOneBy({
    uuid: addressUUID
  });

  const updatedAddressInfo = {
    ...addressToUpdate!,
    ...payload
  };

  const updatedAddress = addressRepository.create(updatedAddressInfo);
  await addressRepository.save(updatedAddress);

  return updatedAddress;
};
