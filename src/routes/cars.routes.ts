import { Router } from "express"
import { listCarsController } from "../controllers/cars.controllers"

export const carsRouter = Router()

carsRouter.get("",listCarsController)