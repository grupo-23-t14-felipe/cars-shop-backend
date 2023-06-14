import { Request, Response } from "express"
import { listAllActiveCarsService, listCarByUserIdService } from "../services/cars/listCars.service"
import { createCarService } from "../services/cars/createCars.service"
import { updateCarService } from "../services/cars/updateCars.service"
import { deleteCarService } from "../services/cars/deleteCars.service"
import { ICar } from "../interfaces/cars.interfaces"

export const createCarController = async (req: Request, res: Response): Promise<Response> => {
    const carCreated = await createCarService(req.body, req.user.uuid)
    return res.status(201).json(carCreated)
} 

export const listAllCarsController = async (req: Request, res:Response): Promise<Response> =>{
    const cars = await listAllActiveCarsService()
    return res.status(200).json(cars)
}

export const listCarByUserIdController = async (req: Request, res: Response): Promise<Response> =>{
    const carList: ICar[] = await listCarByUserIdService(req.params.userUUID, req.user.uuid)
    return res.status(200).json(carList)
}

export const updateCarController =async (req: Request, res: Response): Promise<Response> => {
    const updatedCar = await updateCarService(req.body, req.params.carUUID)
    return res.status(200).json(updatedCar)
}

export const deleteCarController =async (req: Request, res: Response): Promise<Response> => {
    await deleteCarService(req.params.carUUID)
    return res.status(204).send()
}
