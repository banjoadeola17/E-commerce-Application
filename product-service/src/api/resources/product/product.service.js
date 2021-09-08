import Joi from "joi";
import { BAD_REQUEST, OK } from "../../modules/status";
import { Product } from "./product.model";
import logger from "../../logger";

export const getProduct: Product = async (productId: string) => {
  try {
    const existingProduct = await Product.findOne({ _id: productId });
    if (!existingProduct) {
      return Promise.reject({
        statusCode: NOT_FOUND,
        message: "Product not found.",
      });
    }
    logger.info(
      `::: Existing product found with a response [${JSON.stringify(
        existingProduct
      )}] :::`
    );
    return Promise.resolve({
      statusCode: OK,
      data: existingProduct,
    });
  } catch (err) {
    logger.error(`::: Product not found with error [${JSON.stringify(err)}] :::`);
    return Promise.reject({
      statusCode: BAD_REQUEST,
      message: "Could not find product. Please try again",
    });
  }
};
