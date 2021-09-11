import amqp from "amqplib";
import Joi from "joi";
import { BAD_REQUEST, OK } from "../../modules/status";
import { Transaction } from "./payment.model";
import logger from "../../logger";
import { worker } from "../queues/worker";

let channel, connection;
const queue = "transaction";

const connectionChannel = async () => {
  try {
    connection = await amqp.connect(process.env.RABBITMQ_URI);
    channel = await connection.createChannel();
    await channel.assertQueue(queue, { durable: true });
    console.log(`Connection created for queue: ${queue}`);
  } catch (err) {
    console.log(err);
    const error = new Error(
      "An error occured while connecting to raabitmq server"
    );
    throw error;
  }
};

connectionChannel();

export const sendData: Transaction = async (params) => {
  if (!params) {
    return Promise.reject({
      statusCode: BAD_REQUEST,
      message: "request body is required.",
    });
  }

  logger.info(`::: Request received as [${JSON.stringify(params)}] :::`);

  const validateSchema = validatePaymentParams({ params });
  if (validateSchema.error) {
    return Promise.reject({
      statusCode: BAD_REQUEST,
      message: validateSchema.error.details[0].message,
    });
  }

  try {
    channel.sendToQueue(queue, Buffer.from(JSON.stringify(params)), {
      persistent: true,
    });

    let newTransaction;
    channel.consume(queue, (data) => {
      console.log("Consuming transaction data", data);
      const { customerId, productId, orderId, price } = JSON.parse(
        data.content
      );

      const transactionParams = { customerId, productId, orderId, price };
      console.log("transactionParams", transactionParams);
      newTransaction = createTransaction(transactionParams);
      channel.ack(data);
      // connection.close();
      // process.exit(0);
    });

    return Promise.resolve({
      statusCode: OK,
      data: newTransaction,
    });
  } catch (err) {
    logger.error(
      `::: Product not found with error [${JSON.stringify(err)}] :::`
    );

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
    price: data.price,
  });
  newTransaction.save();
  return newTransaction;
};

const validatePaymentParams = ({ params }) => {
  const schema = Joi.object().keys({
    customerId: Joi.string().required(),
    orderId: Joi.string().required(),
    productId: Joi.string().required(),
    price: Joi.string().required(),
  });

  return Joi.validate(params, schema);
};

