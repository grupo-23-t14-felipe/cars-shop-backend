import { Router } from "express";
import { carsRouter } from "./cars.routes";
import { usersRouter } from "./users.routes";
import { sessionRouter } from "./session.routes";
import { swaggerRouter } from "./swagger.routes";

const router = Router();

router.use("/login", sessionRouter);
router.use("/cars", carsRouter);
router.use("/users", usersRouter);
router.use("/doc", swaggerRouter);

export default router;
