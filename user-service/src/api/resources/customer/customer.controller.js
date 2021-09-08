import { getUser } from "./customer.service";

export const findUserById = (req, res) => {
  const customerId = req.params.customerId
  getUser(customerId)
    .then((dataObj) => {
      res.status(dataObj.statusCode).send({ status: true, data: dataObj.data });
    })
    .catch((e) => {
      res.status(e.statusCode).send({ status: false, message: e.message });
    });
};
