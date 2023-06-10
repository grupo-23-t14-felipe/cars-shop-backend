import { AppDataSource } from "../../data-source";
import { Car, User } from "../../entities";
import { fuelType } from "../../entities/cars.entity";
import { ICar, ICarCreate, ICarCreateRequest, ICarRepo } from "../../interfaces/cars.interfaces";
import { IUserRepo } from "../../interfaces/user.interface";

export const createCarService = async (payload: ICarCreateRequest, userUUID: string) => {
    const carRepository: ICarRepo = AppDataSource.getRepository(Car)
    const userRepository: IUserRepo = AppDataSource.getRepository(User)

    const newCarInfo: ICarCreate = {...payload, is_good_deal: false}
    if(payload.value / payload.fipe_price <= 0.95){
        newCarInfo.is_good_deal = true
    }

    const logedUser: User | null = await userRepository.findOneBy({uuid: userUUID})
    

    const createdCar = carRepository.create({...newCarInfo, user: logedUser!})
    await carRepository.save(createdCar)

    return createdCar
    
}