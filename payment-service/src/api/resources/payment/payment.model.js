import mongoose from "mongoose";

const schema = {
  customerId: String,
  productId: String,
  orderId: String,
  price: String,
};

const transactionSchema = new mongoose.Schema(schema, { timestamps: true });

transactionSchema.set("toJSON", {
  transform: function (doc, ret) {
    ret.transactionId = ret._id;
    delete ret._id;
    delete ret.__v;
  },
});

export const Transaction = mongoose.model("transaction", transactionSchema);
