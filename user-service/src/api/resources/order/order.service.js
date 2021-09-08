import Joi from "joi";
import { BAD_REQUEST, OK } from "../../modules/status";
import { Customer } from "../customer/customer.model";
import {getProduct} from "../../modules/product-service";
import {postOrder} from "../../modules/order-service";
import logger from "../../logger";

export const sendOrder = async (customerId, productId) => {
  try {
    //  Check if the user making order exists
    const existingUser = await Customer.findOne({ _id: customerId });
    if (!existingUser) {
      return Promise.reject({
        statusCode: NOT_FOUND,
        message: "User not found.",
      });
    }
    logger.info(
      `::: Existing user found with a response [${JSON.stringify(
        existingUser
      )}] :::`
    );

    // Fetch the product from the product service
    const uri = `${process.env.PRODUCT_SERVICE_ENDPOINT}/product/${productId}`;
    const retries = 3;
    const backOff = 300;
    const product = await getProduct(uri, retries, backOff);
    if (!product) {
      return Promise.reject({
        statusCode: NOT_FOUND,
        message: "The requested product could not be found.",
      });
    }

    logger.info(
      `::: Fetching product with data [${JSON.stringify(product)}] :::`
    );

    const productData = product.data;

    const payLoad = {
      customerId: existingUser._id,
      productId: productData.productId,
      price: productData.price,
    };

    console.log("payLoad", payLoad)
    // Send order to order service
    const url = `${process.env.ORDER_SERVICE_ENDPOINT}/order`;

    const orderResponse = await postOrder(
      url,
      payLoad,
      retries,
      backOff,
    );

    const order = orderResponse.data;
    return Promise.resolve({
      statusCode: OK,
      data: order,
    });
  } catch (err) {
    logger.error(`::: Unable to post order with error [${JSON.stringify(err)}] :::`);
    return Promise.reject({
      statusCode: BAD_REQUEST,
      message: "Could not find customer. Please try again",
    });
  }
};
