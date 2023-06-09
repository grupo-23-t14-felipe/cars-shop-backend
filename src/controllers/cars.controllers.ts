import { Request, Response } from "express"
import listCarsService from "../services/cars/listCars.service"
import { createCarService } from "../services/cars/createCars.service"

export const createCarController = async (req: Request, res: Response): Promise<Response> => {
    const carCreated = await createCarService(req.body, req.user.uuid)
    return res.status(201).json(carCreated)
} 

export const listCarsController = async (req: Request, res:Response): Promise<Response> =>{
   
    const cars = await listCarsService()

    return res.status(200).json(cars)
}