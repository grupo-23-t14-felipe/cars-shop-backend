import { ICar, ICarRepo } from "../../interfaces/cars.interfaces"
import { Car } from "../../entities"
import { AppDataSource } from "../../data-source"

interface ListCarsFilters {
  fuelType?: string;
  color?: string;
  isGoodDeal?: boolean;
  year?: number;
  model?: string;
  brand?: string;
  valueMin?: number;
  valueMax?: number;
  mileageMin?:number;
  mileageMax?:number;
}

const listCarsService = async (page: number, filters?: ListCarsFilters): Promise<ICar[]> => {
  const carRepository: ICarRepo = AppDataSource.getRepository(Car)

  const itemsPerPage = 12
  const offset = (page - 1) * itemsPerPage

  const queryBuilder = carRepository.createQueryBuilder('car')
    .leftJoinAndSelect('car.user', 'user')
    .leftJoinAndSelect('car.comments', 'comment')
    .leftJoinAndSelect('car.galleries', 'gallery')
    .skip(offset)
    .take(itemsPerPage)

  if (filters) {
    const {
      fuelType,
      color,
      isGoodDeal,
      year,
      model,
      brand,
      valueMin,
      valueMax,
      mileageMin,
      mileageMax
    } = filters

    if (fuelType) {
      queryBuilder.andWhere('car.fuel_type = :fuelType', { fuelType })
    }
    if (color) {
      queryBuilder.andWhere('car.color = :color', { color })
    }
    if (isGoodDeal !== undefined) {
      queryBuilder.andWhere('car.is_good_deal = :isGoodDeal', { isGoodDeal })
    }
    if (year) {
      queryBuilder.andWhere('car.year = :year', { year })
    }
    if (model) {
      queryBuilder.andWhere('car.model = :model', { model })
    }
    if (brand) {
      queryBuilder.andWhere('car.brand = :brand', { brand })
    }
    if (valueMin !== undefined) {
      queryBuilder.andWhere('car.value >= :valueMin', { valueMin })
    }
    if (valueMax !== undefined) {
      queryBuilder.andWhere('car.value <= :valueMax', { valueMax })
    }
    if (mileageMin !== undefined) {
        queryBuilder.andWhere('car.mileage >= :mileageMin', { mileageMin })
      }
    if (mileageMax !== undefined) {
        queryBuilder.andWhere('car.mileage <= :mileageMax', { mileageMax })
    }
  }

  const cars = await queryBuilder.getMany()

  return cars
}

export default listCarsService


