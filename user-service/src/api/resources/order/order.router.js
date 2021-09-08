import express from "express";
import { makeOrder } from "./order.controller";

export const OrderRouter = express.Router();
OrderRouter.route("/:customerId/:productId").post(makeOrder);
