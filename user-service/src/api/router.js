import express from "express";
import { errorHandler } from "./modules/error-handler";
import { secureRoute } from "./middleware";
import { HelloRouter } from "./resources/health";
import { UserRouter } from "./resources/customer";
import { OrderRouter } from "./resources/order";

export const router = express.Router();
router.use(secureRoute);

router.use("/", HelloRouter);
router.use("/user", UserRouter);
router.use("/order", OrderRouter);
router.use(errorHandler);
