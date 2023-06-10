import { Router } from "express"
import { createCarController, listCarsController, updateCarController, deleteCarController } from "../controllers/cars.controllers"
import { validateDataMdwr } from "../middlewares/validateDataMiddleware"
import { CarCreateRequestSchema, CarUpdateRequestSchema } from "../schemas/cars.schemas"
import { ensureCarExistsMdwr } from "../middlewares/cars/ensureCarExists.middleware"
import verifyTokenIsValidMiddleware from "../middlewares/session/verifyTokenIsValidMiddleware"

export const carsRouter = Router()

// Quando tiver a rota de login implementada, adicionar aqui autenticação no middleware, passando o UUID do usuário para o req.user
carsRouter.post("", verifyTokenIsValidMiddleware,validateDataMdwr(CarCreateRequestSchema), createCarController)
carsRouter.get("", listCarsController)
carsRouter.patch("/:uuid", ensureCarExistsMdwr, validateDataMdwr(CarUpdateRequestSchema), updateCarController)
carsRouter.patch("/:uuid", ensureCarExistsMdwr, deleteCarController)
