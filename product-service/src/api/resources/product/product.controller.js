import { getProduct } from "./product.service";

export const getProductById = (req, res) => {
  const productId = req.params.productId;
  getProduct(productId)
    .then((dataObj) => {
      res.status(dataObj.statusCode).send({ status: true, data: dataObj.data });
    })
    .catch((e) => {
      res.status(e.statusCode).send({ status: false, message: e.message });
    });
};
