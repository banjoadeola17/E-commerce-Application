// import amqp from "amqplib";
// import { createTransaction } from "../payment/payment.model";
//
// const queue = "transaction";
//
// let channel, connection;
// const connectionChannel = async (params) => {
//   try {
//     connection = await amqp.connect(process.env.RABBITMQ_URI);
//     channel = await connection.createChannel();
//     await channel.assertQueue(queue);
//     console.log(`Waiting for data in queue: ${queue}`);
//   } catch (err) {
//     console.log(err);
//   }
// };
//
// connectionChannel();

// import { connectionChannel } from "../payment/payment.service";
// import { createTransaction } from "../payment/payment.service";
// //
// export const worker = (data, channel) => {
//   channel.consume(queue, (data) => {
//     console.log("Consuming transaction data", data);
//     const { customerId, productId, orderId, price } = JSON.parse(
//       data.content
//     );
//
//     console.log("customerId", customerId);
//     const transactionParams = { customerId, productId, orderId, price };
//     console.log(data);
//     const newTransaction = createTransaction(transactionParams);
//     channel.ack(data);
//   });
// };
