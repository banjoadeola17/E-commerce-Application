import express from "express";
import { postPaymentData } from "./payment.controller";

export const PaymentRouter = express.Router();
PaymentRouter.route("/").post(postPaymentData);
