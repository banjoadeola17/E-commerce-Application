import express from "express";
import { findUserById } from "./customer.controller";

export const UserRouter = express.Router();
UserRouter.route("/:customerId").get(findUserById);
