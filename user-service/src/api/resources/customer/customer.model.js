import mongoose from "mongoose";

const schema = {
  firstName: String,
  lastName: String,
  email: String,
  phoneNumber: String
};

const customerSchema = new mongoose.Schema(schema, { timestamps: true });

customerSchema.set("toJSON", {
  transform: function (doc, ret) {
    ret.customerId = ret._id;
    delete ret._id;
    delete ret.__v;
  },
});

export const Customer = mongoose.model("customer", customerSchema);
