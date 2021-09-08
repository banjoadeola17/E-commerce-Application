import express from "express";
import { errorHandler } from "./modules/error-handler";
import { secureRoute } from "./middleware";
import { HelloRouter } from "./resources/health";
import { ProductRouter } from "./resources/product";

export const router = express.Router();
router.use(secureRoute);

router.use("/", HelloRouter);
router.use("/product", ProductRouter);
router.use(errorHandler);
