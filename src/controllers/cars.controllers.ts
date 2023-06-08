import { Request, Response } from "express"
import listCarsService from "../services/cars/listCars.service"

export const listCarsController = async (req: Request, res:Response) =>{
   
    const cars = await listCarsService()

    return res.status(200).json(cars)
}