import { AppDataSource } from "../../data-source";
import { Car, Gallery } from "../../entities";
import AppError from "../../errors/appError";
import { ICarRepo, ICarUpdateRequestRequired } from "../../interfaces/cars.interfaces";

export const updateCarService = async (payload: ICarUpdateRequestRequired, carUUID: string) => {
  const carRepository: ICarRepo = AppDataSource.getRepository(Car);

  const carToUpdate: Car | null = await carRepository.findOne({
    where: {
      uuid: carUUID
    },
    relations: {
      gallery: true
    }
  });

  if (!carToUpdate) {
    throw new AppError("Car not found.", 404);
  }

  const galleryRepo = AppDataSource.getRepository(Gallery);

  const results = [];

  if (payload.gallery?.length) {
    for (let i = 0; i < payload.gallery.length; i++) {
      const createLinks = galleryRepo.create({
        imageUrl: payload.gallery[i],
        car: carToUpdate
      });
      const response = await galleryRepo.save(createLinks);
      results.push(response);
    }
  }

  let updatedCarInfo = {
    ...carToUpdate!,
    ...payload,
    gallery: results
  };

  if (carToUpdate.gallery.length > 0) {
    updatedCarInfo = {
      ...carToUpdate!,
      ...payload,
      gallery: [...carToUpdate.gallery, ...results]
    };
  }

  if (updatedCarInfo.value! / updatedCarInfo.fipe_price! <= 0.95) {
    updatedCarInfo.is_good_deal = true;
  } else {
    updatedCarInfo.is_good_deal = false;
  }

  const updatedCar = carRepository.create(updatedCarInfo);

  await carRepository.save(updatedCar);

  return updatedCar;
};
