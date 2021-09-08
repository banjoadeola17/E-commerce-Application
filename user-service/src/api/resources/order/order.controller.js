import { sendOrder } from "./order.service";

export const makeOrder = (req, res) => {
  const { customerId, productId } = req.params;
  console.log(customerId, productId)
  sendOrder(customerId, productId)
    .then((dataObj) => {
      res.status(dataObj.statusCode).send({ status: true, data: dataObj.data });
    })
    .catch((e) => {
      res.status(e.statusCode).send({ status: false, message: e.message });
    });
};
