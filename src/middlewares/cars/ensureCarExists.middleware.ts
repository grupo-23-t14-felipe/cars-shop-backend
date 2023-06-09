import { NextFunction, Request, Response } from "express";
import { ICarRepo } from "../../interfaces/cars.interfaces";
import { AppDataSource } from "../../data-source";
import { Car } from "../../entities";
import AppError from "../../errors/appError";

export const ensureCarExistsMdwr = async (req: Request, res: Response, next: NextFunction): Promise<void | NextFunction> => {
    const carRepository: ICarRepo = AppDataSource.getRepository(Car)
    const carExists: boolean = await carRepository.exist({
        where: {
            uuid: req.params.uuid
        }
    })

    if(!carExists){
        throw new AppError('Car not found', 404)
    }

    return next()
}