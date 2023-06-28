import { Router } from "express";

import {
  createCarController,
  listCarsController,
  updateCarController,
  deleteCarController,
  listCarByUuidController,
} from "../controllers/cars.controllers";
import {
  createCommentController,
  deleteCommentController,
  updateCommentController,
} from "../controllers/comments.controllers";
import { deleteGalleryController } from "../controllers/gallery.controllers";

import {
  CarCreateRequestSchema,
  CarUpdateRequestSchema,
} from "../schemas/cars.schemas";

import { validateDataMdwr } from "../middlewares/validateDataMiddleware";
import { ensureCarExistsMdwr } from "../middlewares/cars/ensureCarExists.middleware";
import verifyTokenIsValidMiddleware from "../middlewares/session/verifyTokenIsValidMiddleware";
import { checkOwnershipMiddleware } from "../middlewares/cars/ownership.middleware";
import {
  commentCreateSchema,
  commentUpdateSchema,
} from "../schemas/comments.schemas";

export const carsRouter = Router();

carsRouter.post(
  "",
  verifyTokenIsValidMiddleware,
  validateDataMdwr(CarCreateRequestSchema),
  createCarController
);
carsRouter.get("", listCarsController);
carsRouter.get("/:carUUID", listCarByUuidController);

carsRouter.patch(
  "/:carUUID",
  verifyTokenIsValidMiddleware,
  checkOwnershipMiddleware,
  ensureCarExistsMdwr,
  validateDataMdwr(CarUpdateRequestSchema),
  updateCarController
);
carsRouter.delete(
  "/:carUUID",
  verifyTokenIsValidMiddleware,
  checkOwnershipMiddleware,
  ensureCarExistsMdwr,
  deleteCarController
);

carsRouter.post(
  "/comments/:carUUID",
  validateDataMdwr(commentCreateSchema),
  verifyTokenIsValidMiddleware,
  createCommentController
);

carsRouter.patch(
  "/comments/:commentUUID",
  validateDataMdwr(commentUpdateSchema),
  verifyTokenIsValidMiddleware,
  updateCommentController
);

carsRouter.delete(
  "/comments/:commentUUID",
  verifyTokenIsValidMiddleware,
  deleteCommentController
);

carsRouter.delete(
  "/gallery/:galleryUUID",
  verifyTokenIsValidMiddleware,
  deleteGalleryController
);
