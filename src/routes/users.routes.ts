import { Router } from "express";
import { createUserController } from "../controllers/users.controllers";
import { validateDataMdwr } from "../middlewares/validateDataMiddleware";
import { UserCreateRequestSchema } from "../schemas/users.schemas";
import verifyTokenIsValidMiddleware from "../middlewares/session/verifyTokenIsValidMiddleware";
import { listCarByUserIdController } from "../controllers/users.controllers";
import { ensureUserUuidExistsMdwr } from "../middlewares/users/ensureUserUuidExists.middleware";

export const usersRouter = Router();

usersRouter.post(
  "",
  validateDataMdwr(UserCreateRequestSchema),
  createUserController
);
usersRouter.get(
  "/:userUUID",
  verifyTokenIsValidMiddleware,
  ensureUserUuidExistsMdwr,
  listCarByUserIdController
);
