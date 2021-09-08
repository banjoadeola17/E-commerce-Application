import express from "express";
import { fetchOrders, postOrder } from "./order.controller";

export const OrderRouter = express.Router();
OrderRouter.route("/:customerId").get(fetchOrders);
OrderRouter.route("/").post(postOrder);
