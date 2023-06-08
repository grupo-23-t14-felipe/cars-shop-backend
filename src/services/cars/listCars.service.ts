import { Repository } from "typeorm"
import { ICar } from "../../interfaces/cars.interfaces"
import { Car } from "../../entities"
import { AppDataSource } from "../../data-source"

const listCarsService = async (): Promise<ICar[]> => {
    const carRepository: Repository<Car> = AppDataSource.getRepository(Car);
    
    const cars = await carRepository.createQueryBuilder('car')
    .leftJoinAndSelect('car.user', 'user')
    .leftJoinAndSelect('car.comments', 'comment')
    .leftJoinAndSelect('car.galleries', 'gallery')
    .getMany()
  
    return cars
}
export default listCarsService