import express from "express";
import { getProductById } from "./product.controller";

export const ProductRouter = express.Router();
ProductRouter.route("/:productId").get(getProductById);
