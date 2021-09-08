import { sendData } from "./payment.service";

export const postPaymentData = (req, res) => {
  const params = req.body;
  sendData(params)
    .then((dataObj) => {
      res.status(dataObj.statusCode).send({ status: true, data: dataObj.data });
    })
    .catch((e) => {
      res.status(e.statusCode).send({ status: false, message: e.message });
    });
};
