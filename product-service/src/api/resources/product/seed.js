import faker from "faker";
import { Product } from "./product.model";

/** create fake products then seed database */

export const seedProducts = async () => {
  try {
    /** check if db is already populated with products*/
    const existingProducts = await Product.find();
    if (existingProducts.length > 1) {
      return;
    }
    /** quantity to be generated */
    const quantity = 20;
    /** empty array to store new data */
    let products = [];
    for (let i = 0; i < quantity; i++) {
      products.push(
        new Product({
          productName: faker.commerce.productName(),
          productDescription: faker.commerce.productDescription(),
          price: faker.commerce.price(),
          imageUrl: faker.image.imageUrl(),
        })
      );
    }

    await Product.deleteMany();
    /** create new database entry for every product in the array */
    products.forEach((product) => {
      Product.create(product);
    });
    console.log("Products Collection has been Populated!");
  } catch (error) {
    console.log(error);
  }
};
