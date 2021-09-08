import express from "express";
import { errorHandler } from "./modules/error-handler";
import { secureRoute } from "./middleware";
import { HelloRouter } from "./resources/health";
import { PaymentRouter } from "./resources/payment";

export const router = express.Router();
router.use(secureRoute);

router.use("/", HelloRouter);
router.use("/payment", PaymentRouter);
router.use(errorHandler);
