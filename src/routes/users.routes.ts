import { Router } from "express";
import {
  createUserController,
  updateUserController,
} from "../controllers/users.controllers";
import { validateDataMdwr } from "../middlewares/validateDataMiddleware";
import {
  UserCreateRequestSchema,
  UserUpdateRequestSchema,
} from "../schemas/users.schemas";
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

usersRouter.patch(
  "/:userUUID",
  verifyTokenIsValidMiddleware,
  ensureUserUuidExistsMdwr,
  validateDataMdwr(UserUpdateRequestSchema),
  updateUserController
);
