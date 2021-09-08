import Joi from "joi";
import { BAD_REQUEST, OK } from "../../modules/status";
import { Order } from "./order.model";
import { postPayment } from "../../modules/payment-service";
import logger from "../../logger";

export const getOrders = async (customerId: string) => {
  try {
    const ordersByUser = await Order.find({customerId});
    if (!ordersByUser) {
      return Promise.reject({
        statusCode: NOT_FOUND,
        message: "No orders found for the customer.",
      });
    }
    logger.info(
        `::: Orders for the customer found with a response [${JSON.stringify(
            ordersByUser
        )}] :::`
    );
    return Promise.resolve({
      statusCode: OK,
      data: ordersByUser,
    });
  } catch (err) {
    logger.error(`::: Product not found with error [${JSON.stringify(err)}] :::`);
    return Promise.reject({
      statusCode: BAD_REQUEST,
      message: "Could not find product. Please try again",
    });
  }
};

export const createOrder = async (params) => {
  if (!params) {
    return Promise.reject({
      statusCode: BAD_REQUEST,
      message: "request body is required.",
    });
  }

  logger.info(
    `::: Request for new order received as [${JSON.stringify(params)}] :::`
  );

  const validateSchema = validateOrderParams({ params });
  if (validateSchema.error) {
    return Promise.reject({
      statusCode: BAD_REQUEST,
      message: validateSchema.error.details[0].message,
    });
  }
  try {
    //  Create order
    const newOrder = createNewOrder(params)

    const payLoad = {
      customerId: newOrder.customerId,
      orderId: newOrder._id,
      productId: newOrder.productId,
      price: newOrder.price,
    };

    // Send order details to payment service
    const uri = `${process.env.PAYMENT_SERVICE_ENDPOINT}/payment`;
    const retries = 3;
    const backOff = 300;

    const paymentResponse = await postPayment(
      uri,
      payLoad,
      retries,
      backOff,
    );

    logger.info(
      `::: Payment created with response [${JSON.stringify(
        paymentResponse
      )}] :::`
    );
    const payment = paymentResponse.data;
    return Promise.resolve({
      statusCode: OK,
      data: {
        customerId: newOrder.customerId,
        orderId: newOrder._id,
        productId: newOrder.productId,
        orderStatus: newOrder.orderStatus,
      },
    });
  } catch (err) {
    logger.error(
      `::: Order details not sent with error [${JSON.stringify(err)}] :::`
    );
    return Promise.reject({
      statusCode: BAD_REQUEST,
      message: "Could not send order details for payment. Please try again",
    });
  }
};

export const createNewOrder = (params) => {
  const newOrder = new Order({
    customerId: params.customerId,
    productId: params.productId,
    price: params.price,
  });
  newOrder.save();
  return newOrder;
}

const validateOrderParams = ({ params }) => {
  const schema = Joi.object().keys({
    customerId: Joi.string().required(),
    productId: Joi.string().required(),
    price: Joi.number().required(),
  });

  return Joi.validate(params, schema);
};
