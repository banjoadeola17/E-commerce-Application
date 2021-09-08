import { getOrders, createOrder } from "./order.service";

export const fetchOrders = (req, res) => {
    const customerId = req.params.customerId
    getOrders(customerId)
        .then((dataObj) => {
            res.status(dataObj.statusCode).send({ status: true, data: dataObj.data });
        })
        .catch((e) => {
            res.status(e.statusCode).send({ status: false, message: e.message });
        });
};

export const postOrder = (req, res) => {
const params =  req.body;
  createOrder(params)
    .then((dataObj) => {
      res.status(dataObj.statusCode).send({ status: true, data: dataObj.data });
    })
    .catch((e) => {
      res.status(e.statusCode).send({ status: false, message: e.message });
    });
};
