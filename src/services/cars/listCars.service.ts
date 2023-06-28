import {
  ICar,
  ICarRepo,
  ICarReturn,
  ICarlist,
} from "../../interfaces/cars.interfaces";
import { Car } from "../../entities";
import { AppDataSource } from "../../data-source";
import { MultipleCarResponseSchema } from "../../schemas/cars.schemas";
import { parseArgs } from "util";

interface ListCarsFilters {
  fuelType?: string;
  color?: string;
  isGoodDeal?: boolean;
  year?: number;
  model?: string;
  brand?: string;
  valueMin?: number;
  valueMax?: number;
  mileageMin?: number;
  mileageMax?: number;
}
const listCarsService = async (
  page: number = 1,
  filters?: ListCarsFilters,
  valueMin?: boolean,
  valueMax?: boolean,
  mileageMin?: boolean,
  mileageMax?: boolean
): Promise<{ count: number; page: number; data: ICarlist }> => {
  const carRepository: ICarRepo = AppDataSource.getRepository(Car);

  if (!page) page = 1;

  const itemsPerPage = 12;
  const offset = (page - 1) * itemsPerPage;

  const countQueryBuilder = carRepository
    .createQueryBuilder("car")
    .where("car.is_active = :is_active", { is_active: true });

  const queryBuilder = carRepository
    .createQueryBuilder("car")
    .where("car.is_active = :is_active", { is_active: true })
    .leftJoinAndSelect("car.gallery", "g")
    .leftJoinAndSelect("car.user", "u")
    .skip(offset)
    .take(itemsPerPage);

  if (filters) {
    const {
      fuelType,
      color,
      isGoodDeal,
      year,
      model,
      brand,
      valueMin: filterValueMin,
      valueMax: filterValueMax,
      mileageMin: filterMileageMin,
      mileageMax: filterMileageMax,
    } = filters;

    if (fuelType) {
      queryBuilder.andWhere("car.fuel_type = :fuelType", { fuelType });
      countQueryBuilder.andWhere("car.fuel_type = :fuelType", { fuelType });
    }
    if (color) {
      queryBuilder.andWhere("car.color = :color", { color });
      countQueryBuilder.andWhere("car.color = :color", { color });
    }
    if (isGoodDeal !== undefined) {
      queryBuilder.andWhere("car.is_good_deal = :isGoodDeal", { isGoodDeal });
      countQueryBuilder.andWhere("car.is_good_deal = :isGoodDeal", {
        isGoodDeal,
      });
    }
    if (year) {
      queryBuilder.andWhere("car.year = :year", { year });
      countQueryBuilder.andWhere("car.year = :year", { year });
    }
    if (model) {
      queryBuilder.andWhere("car.model = :model", { model });
      countQueryBuilder.andWhere("car.model = :model", { model });
    }
    if (brand) {
      queryBuilder.andWhere("car.brand = :brand", { brand });
      countQueryBuilder.andWhere("car.brand = :brand", { brand });
    }
    if (mileageMin !== undefined) {
      queryBuilder.andWhere("car.mileage >= :mileageMin", { mileageMin });
    }
    if (mileageMax !== undefined) {
      queryBuilder.andWhere("car.mileage <= :mileageMax", { mileageMax });
    }

    if (filterValueMin || filterValueMax) {
      queryBuilder.orderBy("car.value", filterValueMin ? "ASC" : "DESC");
    }

    if (filterMileageMin || filterMileageMax) {
      queryBuilder.orderBy("car.mileage", filterMileageMin ? "ASC" : "DESC");
    }
  }

  const cars = await queryBuilder.getMany();
  const countItem = await countQueryBuilder.getCount();

  const parsedCars = MultipleCarResponseSchema.parse(cars);

  const pagination = {
    count: countItem,
    page: page,
    data: parsedCars,
  };

  return pagination;
};

export default listCarsService;
