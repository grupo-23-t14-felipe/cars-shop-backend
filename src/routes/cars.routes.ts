import { Router } from "express"
import { createCarController, listCarsController } from "../controllers/cars.controllers"
import { validateDataMdwr } from "../middlewares/validateDataMiddleware"

export const carsRouter = Router()

// Quando tiver a rota de login implementada, adicionar aqui autenticação no middleware, passando o UUID do usuário para o req.user
carsRouter.post("", validateDataMdwr, createCarController)
carsRouter.get("", listCarsController)