import mongoose from "mongoose";
import { OrderStatus } from "./order.status"

const schema = {
  customerId: String,
  productId: String,
  price: String,
  orderStatus: {
    type: String,
    default: OrderStatus.PENDING,
    enum: [OrderStatus.APPROVED, OrderStatus.PENDING],
  },
};

const orderSchema = new mongoose.Schema(schema, { timestamps: true });

orderSchema.set("toJSON", {
  transform: function (doc, ret) {
    ret.orderId = ret._id;
    delete ret._id;
    delete ret.__v;
  },
});

export const Order = mongoose.model("order", orderSchema);
