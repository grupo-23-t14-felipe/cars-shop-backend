import { ICar, ICarRepo } from "../../interfaces/cars.interfaces"
import { Car, User } from "../../entities"
import { AppDataSource } from "../../data-source"
import { IUser, IUserRepo } from "../../interfaces/user.interface"

export const listAllActiveCarsService = async (): Promise<ICar[]> => {
    const carRepository: ICarRepo = AppDataSource.getRepository(Car)
    
    const cars = await carRepository.createQueryBuilder('car')
    .leftJoinAndSelect('car.user', 'user')
    .leftJoinAndSelect('car.comments', 'comment')
    .leftJoinAndSelect('car.galleries', 'gallery')
    .getMany()
  
    return cars
}

export const listCarByUserIdService = async (searchedUserUUID: string, loggedUserUUID: string | null): Promise<ICar[]> => {
    const carRepository: ICarRepo = AppDataSource.getRepository(Car)
    const userRepository: IUserRepo = AppDataSource.getRepository(User)

    const searchedUser = await userRepository.findOneByOrFail({ uuid: searchedUserUUID})

    const cars: ICar[] = []

    if(searchedUserUUID === loggedUserUUID){
        const cars = carRepository.find({
            where: {
                user: {
                    uuid: searchedUserUUID
                }
            },
            relations: {
                user: true,
                comments: true,
                galleries: true,
            }
        })
    } else {
        const cars = carRepository.find({
            where: {
                user: {
                    uuid: searchedUserUUID
                },
                is_active: true
            },
            relations: {
                user: true,
                comments: true,
                galleries: true,
            }
        })

    }

    return cars
    
}
