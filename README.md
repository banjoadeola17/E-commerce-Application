# E-commerce App

E-commerce app with REST API using node.js and express.js framework, with rabbitmq for asynchronous communication

_Author:_ Adeola Banjo

## Features

* The user-service holds the customer data, and customers/ users can be queried from the service. For demonstration purposes, only one user is seeded into the database user faker for use. 
Users also make orders from the user-service, and the order is sent to the 
order-service which holds the order data. Orders made by the users can also be queried from the order -service. 
* The product-service on the other hand holds the product details. The product database is seeded with about twenty product samples which users can order from.
* The payment service accept the data conataining the key details to make payments transactions, processes it and publish the transaction details to the rabbitmq worker that saves the transaction details to the transaction databse.

### Other Features

- The services use basic auth for authentication to ensure security of customers information.

## Technologies

- NodeJS
- Express
- MongoDB
- RabbitMQ
- Docker

## Requirements

- NodeJS (minimum v14.0.0)

## Installation

### Node.JS

Ensure you have node installed on your system, visit [node.org](https://nodejs.org/en/download/) to install. Once installed, open a terminal and run the command to confirm node is installed and see the current version

```bash
node -v
```

## Project Structure

The code base is structured to contain all the services interacting to complete a transaction.

- ORDER_SERVICE - This contains the files and folders for the order service
- PAYMENT_SERVICE - This contains the files and folders for the payment service
- PRODUCT_SERVICE - contains files and folders for the product service
- USER_SERVICE - contains files and folders for the customer service

All the services are similar in structure and arrangement for ease of code managment and future improvement

## Set - Up

Clone the project from the github repository [https://github.com/banjoadeola17/E-commerce-Application]

### Install Dependencies

To install the dependencies of the project

Navigate to the root folder of the project, open a terminal and run the following command

```bash
npm install

```

### Serve the project

At this point, everything should be set and project ready to run.

The project uses babel compiler to allow the use of ES Modules. Hence, to start the project,
Run the following command

```bash
npm run build && npm run start
```

### Tests

Installing the dependences will install `mocha`, `sinon` and `chai`. Theses are the packages needed for the test.

In the terminal of your root project, Run the following command

```bash
npm run build && npm run integration-test
```

## END-POINT

If everything runs fine, navigate to your browser and open the follwoin
- user-service -> localhost:1200
- order-service -> localhost:1202
- product-service -> localhost:1201
- payment-service -> localhost:1203

You will get a welcome message similar to below;
 ```
{
    status: true,
    message: "Welcome to [XXX] Service"
}
```

## ENDPOINTS/ APIs

### user-service 

BaseUrl -> localhost:1200

- Gets a single user

`GET /user/:customerId`

_Response format_

```bash
{
    "status": true,
    "data": {
        "firstName": "Michel",
        "lastName": "Hills",
        "email": "Mathew4@gmail.com",
        "phoneNumber": "(770) 643-0343 x291",
        "createdAt": "2021-09-04T22:52:21.465Z",
        "updatedAt": "2021-09-04T22:52:21.465Z",
        "customerId": "6133f8a544c98c07c083ad8d"
    }
}
```

- Make order

`POST /order/:customerId/:productId`
_Response format_

```bash
{
    "status": true,
    "data": {
        "customerId": "6133f8a544c98c07c083ad8d",
        "orderId": "61382bac0176460e2aa65ea0",
        "productId": "613400a6a790c7229c76b1c7",
        "orderStatus": "PENDING"
    }
}
```

### product-service

- Fetch a product

`GET /product/:productId`

_Response format_


_Response format_

```bash
{
    "status": true,
    "data": {
        "productDescription": "The slim & simple Maple Gaming Keyboard from Dev Byte comes with a sleek body and 7- Color RGB LED Back-lighting for smart functionality",
        "price": 13,
        "imageUrl": "http://placeimg.com/640/480",
        "createdAt": "2021-09-04T23:26:31.123Z",
        "updatedAt": "2021-09-04T23:26:31.123Z",
        "productId": "613400a6a790c7229c76b1c7"
    }
}
```

### order-service

- Fetch orders by customer

`GET /order/:customerId`

_Response format_

```bash
{
    "status": true,
    "data": [{
        "orderStatus": "PENDING",
        "customerId": "6133f8a544c98c07c083ad8d",
        "productId": "613400a6a790c7229c76b1c7",
        "price": "13",
        "createdAt": "2021-09-07T16:33:06.666Z",
        "updatedAt": "2021-09-07T16:33:06.666Z",
        "orderId": "613794425d7a6e2c2a863299"
    }
}]
```

## IMPROVEMENTS

For improvements to the to make the application better

- More test cases are needed to cover success and failure cases
- Implement admin users with authorization
- Implement Create user and products flow

### -------------------------------Side note--------------------------------------------------
The environment variables are shared below;

_USER_SERVICE_USERNAME=user_
_USER_SERVICE_PASSWORD=2nKxL825_
_USER_SERVICE_ENDPOINT=http://localhost:1200_
_ORDER_SERVICE_USERNAME=order_
_ORDER_SERVICE_PASSWORD=dg6hY2QS_
_ORDER_SERVICE_ENDPOINT=http://localhost:1202_
_PRODUCT_SERVICE_USERNAME=product_
_PRODUCT_SERVICE_PASSWORD=35SKq7TJ_
_PRODUCT_SERVICE_ENDPOINT=http://localhost:1201_
_PAYMENT_SERVICE_USERNAME=payment_
_PAYMENT_SERVICE_PASSWORD=KfuWcDrd_
_PAYMENT_SERVICE_ENDPOINT=http://localhost:1203_
_MONGODB_URI=mongodb+srv://adeola17:Adevictor17@cluster0.eztdv.mongodb.net/product-service?retryWrites=true&w=majority_
