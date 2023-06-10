import { AppDataSource } from "../../data-source";
import { Car } from "../../entities";
import { ICarRepo, ICarUpdateRequest } from "../../interfaces/cars.interfaces";

export const updateCarService = async (payload: ICarUpdateRequest, carUUID: string) => {
    const carRepository: ICarRepo = AppDataSource.getRepository(Car)

    const carToUpdate: Car|null = await carRepository.findOneBy({uuid: carUUID})

    const updatedCarInfo = {
        ...payload,
        ...carToUpdate!,
    }

    if(updatedCarInfo.value! / updatedCarInfo.fipe_price! <= 0.95){
        updatedCarInfo.is_good_deal = true
    } else {
        updatedCarInfo.is_good_deal = false
    }

    const updatedCar = carRepository.create(updatedCarInfo)
    await carRepository.save(updatedCar)

    return updatedCar
}