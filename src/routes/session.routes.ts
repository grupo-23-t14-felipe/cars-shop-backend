import { Router } from "express"
import { createSessionController } from "../controllers/session.controllers"
import { validateDataMdwr } from "../middlewares/validateDataMiddleware"
import { UserLoginSchema } from "../schemas/users.schemas"

export const sessionRouter = Router()

sessionRouter.post("", validateDataMdwr(UserLoginSchema),createSessionController)