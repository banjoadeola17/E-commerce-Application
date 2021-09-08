import amqp from "amqplib"
import Joi from "joi";
import { BAD_REQUEST, OK } from "../../modules/status";
import { Transaction } from "./payment.model";
import logger from "../../logger";
import { consumeTransactionData } from "../queues/worker";

let channel, connection;
const queue = "transaction";

const sendTransactionData = async () => {
  try {
    connection = await amqp.connect('amqp://localhost:5672');
    channel = await connection.createChannel();
    await channel.assertQueue(queue);
    console.log(`Waiting to send data to queue: ${queue}`)
  } catch(err) {
    console.log(err)
  }}

sendTransactionData()

export const sendData: Transaction = async (params) => {
  if (!params) {
    return Promise.reject({
      statusCode: BAD_REQUEST,
      message: "request body is required.",
    });
  }

  logger.info(
      `::: Request received as [${JSON.stringify(params)}] :::`
  );

  const validateSchema = validatePaymentParams({ params });
  if (validateSchema.error) {
    return Promise.reject({
      statusCode: BAD_REQUEST,
      message: validateSchema.error.details[0].message,
    });
  }

  try {
    channel.sendToQueue(
        queue, Buffer.from(JSON.stringify(params)),
        {persistent: true}
    );

    let newTransaction
    channel.consume(queue, (transactionData) => {
      console.log("Consuming transaction data", transactionData);
      const { customerId, productId, orderId, price } = JSON.parse(transactionData.content);
      const data = { customerId, productId, orderId, price }
      console.log(data)
      newTransaction = createTransaction(data);
      channel.ack(data);
      connection.close();
      process.exit(0);
    });

    return Promise.resolve({
      statusCode: OK,
      data: newTransaction,
    });
  } catch (err) {
    logger.error(`::: Product not found with error [${JSON.stringify(err)}] :::`);
    return Promise.reject({
      statusCode: BAD_REQUEST,
      message: "Could not find product. Please try again",
    });
  }
};

export const createTransaction = (data) => {
  const newTransaction = new Transaction({
    customerId: data.customerId,
    productId: data.productId,
    orderId: data.orderId,
    price: data.price
  });
  newTransaction.save();
  return newTransaction;
}

const validatePaymentParams = ({ params }) => {
  const schema = Joi.object().keys({
    customerId: Joi.string().required(),
    orderId: Joi.string().required(),
    productId: Joi.string().required(),
    price: Joi.string().required(),
  });

  return Joi.validate(params, schema);
};

