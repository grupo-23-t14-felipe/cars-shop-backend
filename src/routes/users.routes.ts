import { Router } from "express"
import { createUserController } from "../controllers/users.controllers"
import { validateDataMdwr } from "../middlewares/validateDataMiddleware"
import { UserCreateRequestSchema } from "../schemas/users.schemas"

export const usersRouter = Router()

usersRouter.post("",validateDataMdwr(UserCreateRequestSchema),createUserController)