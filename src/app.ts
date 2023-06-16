import "express-async-errors";
import express from "express";
import router from "./routes";
import cors from "cors";

import handdleError from "./errors/handleError";

const app = express();

app.use(cors());
app.use(express.json());
app.use("/", router);
app.use(handdleError);

export default app;
