// import amqp from "amqplib"
//
// const queue = "transaction"
// let channel, connection
//
// const sendTransactionData = async (params) => {
//     try {
//         connection = await amqp.connect('amqp://localhost:5672');
//         channel = await connection.createChannel();
//         await channel.assertQueue(queue, {durable: true});
//         console.log('Sent: ', data);
//         channel.sendToQueue(
//             queue,
//             Buffer.from(
//                 JSON.stringify(data)
//             ),
//             {persistent: true}
//           );
//     } catch (err) {
//         console.log(err)
//     }
// }
//
// sendTransactionData();

// import amqp from 'amqplib/callback_api';

// const sendTransactionData = (data) => {
//     amqp.connect('amqp://localhost', function(error0, connection) {
//         if (error0) {
//             throw error0;
//         }
//         connection.createChannel(function(error1, channel) {
//             if (error1) {
//                 throw error1;
//             }
//             // var queue = 'hello';
//             // var msg = 'Hello world';
//
//             channel.assertQueue(QueueType.SEND_DATA, {
//                 durable: false
//             });
//
//             channel.sendToQueue(QueueType.WORKER, Buffer.from(JSON.stringify(data)));
//             console.log(" transaction data sent as", data);
//         });
//     });
// }

