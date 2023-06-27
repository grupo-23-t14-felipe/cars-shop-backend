import { AppDataSource } from "../../data-source";
import { Car, Gallery, User } from "../../entities";
import {
  ICarCreate,
  ICarCreateRequest,
  ICarRepo,
} from "../../interfaces/cars.interfaces";
import { IUserRepo } from "../../interfaces/user.interface";
import { CarCreateRequestWithotGallerySchema, retrieveCarSchema } from "../../schemas/cars.schemas";

export const createCarService = async (
  payload: ICarCreateRequest,
  userUUID: string
) => {
  const carRepository: ICarRepo = AppDataSource.getRepository(Car);
  const userRepository: IUserRepo = AppDataSource.getRepository(User);
  const galleryRepository = AppDataSource.getRepository(Gallery);

  const linksGallery = payload.gallery;

  const newCarInfo: ICarCreate = { ...payload, is_good_deal: false };
  if (payload.value / payload.fipe_price <= 0.95) {
    newCarInfo.is_good_deal = true;
  }

  const logedUser: User | null = await userRepository.findOneBy({
    uuid: userUUID,
  });

  const newCarInfoParsed =
    CarCreateRequestWithotGallerySchema.parse(newCarInfo);

  const createdCar = carRepository.create({
    ...newCarInfoParsed,
    user: logedUser!,
  });
  const savedCar = await carRepository.save(createdCar);

  const results = [];

  for (let i = 0; i < linksGallery.length; i++) {
    const createLinks = galleryRepository.create({
      imageUrl: linksGallery[i],
      car: savedCar,
    });
    const response = await galleryRepository.save(createLinks);
    results.push(response);
  }

  const queryBuilder = carRepository.createQueryBuilder("car");

  const carId = savedCar.uuid
  const car = await queryBuilder
  .leftJoinAndSelect("car.user", "user")
  .leftJoinAndSelect("car.gallery", "gallery")
  .where("car.uuid = :carId", { carId }) 
  .getOne();

  const parsedCar = retrieveCarSchema.parse(car)
  
  return parsedCar;

};
