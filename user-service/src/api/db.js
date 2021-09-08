import mongoose from "mongoose";
import { seedUser } from "./resources/customer/seed";

mongoose.Promise = global.Promise;

export const connect = () =>
  mongoose
    .connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useFindAndModify: false,
      useCreateIndex: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log("Database connected successfully")
      seedUser();
    })
    .catch((e) => {
      console.log(`Failed to connect to mongodb with error ${e}`);
    });
