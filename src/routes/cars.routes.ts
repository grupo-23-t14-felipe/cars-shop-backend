import { Router } from "express"
import { createCarController, updateCarController, deleteCarController, listCarByUserIdController, listCarsController } from "../controllers/cars.controllers"
import { validateDataMdwr } from "../middlewares/validateDataMiddleware"
import { CarCreateRequestSchema, CarUpdateRequestSchema } from "../schemas/cars.schemas"
import { ensureCarExistsMdwr } from "../middlewares/cars/ensureCarExists.middleware"
import verifyTokenIsValidMiddleware from "../middlewares/session/verifyTokenIsValidMiddleware"
import { ensureUserUuidExistsMdwr } from "../middlewares/users/ensureUserUuidExists.middleware"

export const carsRouter = Router()

carsRouter.post("", verifyTokenIsValidMiddleware,validateDataMdwr(CarCreateRequestSchema), createCarController)
carsRouter.get("", listCarsController)
carsRouter.get("/:userUUID", ensureUserUuidExistsMdwr, listCarByUserIdController)
carsRouter.patch("/:carUUID", ensureCarExistsMdwr, validateDataMdwr(CarUpdateRequestSchema), updateCarController)
carsRouter.patch("/:carUUID", ensureCarExistsMdwr, deleteCarController)
