import number from "joi/lib/types/number";
import mongoose from "mongoose";

const schema = {
  title: String,
  productDescription: String,
  price: Number,
  imageUrl: String,
};

const productSchema = new mongoose.Schema(schema, { timestamps: true });

productSchema.set("toJSON", {
  transform: function (doc, ret) {
    ret.productId = ret._id;
    delete ret._id;
    delete ret.__v;
  },
});

export const Product = mongoose.model("product", productSchema);
