import amqp from "amqplib"
import { createTransaction } from "../payment/payment.model";

const queue = "transaction"

let channel, connection
const consumeTransactionData = async (params) => {
    try {
        connection = await amqp.connect('amqp://localhost:5672');
        channel = await connection.createChannel();
        await channel.assertQueue(queue);
        console.log(`Waiting for data in queue: ${queue}`);
    } catch(err) {
        console.log(err)
    }}

consumeTransactionData()

