import { Router } from "express"
import { createCarController, listCarsController, updateCarController } from "../controllers/cars.controllers"
import { validateDataMdwr } from "../middlewares/validateDataMiddleware"
import { CarCreateRequestSchema, CarUpdateRequestSchema } from "../schemas/cars.schemas"

export const carsRouter = Router()

// Quando tiver a rota de login implementada, adicionar aqui autenticação no middleware, passando o UUID do usuário para o req.user
carsRouter.post("", validateDataMdwr(CarCreateRequestSchema), createCarController)
carsRouter.get("", listCarsController)
carsRouter.patch("/:uuid", validateDataMdwr(CarUpdateRequestSchema), updateCarController)
