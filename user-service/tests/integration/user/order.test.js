// import { describe, it } from "mocha";
// import sinon from "sinon";
// import nock from "nock";
// import chai from "chai";
// import rp from "request-promise";
// import chaiAsPromised from "chai-as-promised";
// import * as OrderService from "../../../src/api/resources/order/order.service";
// import { Customer } from "../../../src/api/resources/customer/customer.model"
// import {
//     BAD_REQUEST,
//     NOT_FOUND,
//     OK,
//     CONFLICT,
//     UN_AUTHORISED,
// } from "../../../src/api/modules/status";
// import {getProduct} from "../../../src/api/modules/product-service";
// import {postOrder} from "../../../src/api/modules/order-service";
//
// chai.use(chaiAsPromised);
// const expect = chai.expect;
//
//
// describe("Order service test", function () {
//     const productId = "613400a6a790c7229c76b1c7"
//     const customerId = "6133f8a544c98c07c083ad8d"
//     const uri = `http://localhost:1201/"product/613400a6a790c7229c76b1c7"`
//     const url = "http://localhost:1202/order}"
//
//     const payLoad = {
//         customerId, productId, price: 23
//     }
//     it("should successfully create an order", async function () {
//
//         const findOneUser = sinon.stub(Customer, "findOne").resolves({
//             firstName:"Michel",
//             lastName:"Hills",
//             email:"Mathew4@gmail.com"
//         });
//
//         // const productResponse = await getProduct(uri, retries, backOff)
//
//         const options = {
//             uri, method: "GET", auth: {user: "product", pass: "35SKq7TJ"}
//         }
//
//         const productResponse = rp(options)
//
//         nock("http://localhost:1201")
//             .get(`/product/${productId}`)
//             .reply(OK, productResponse);
//
//
//
//
//         const option = {url, method: "POST", auth: {user: "order", pass: "dg6hY2QS"}, body: payLoad}
//
//         const orderResponse = rp(option)
//         // await postOrder(payLoad, url, retries, backOff)
//         // process.env.ORDER_SERVICE_ENDPOINT
//         nock("http://localhost:1202")
//             .post(`/order`)
//             .reply(OK, {
//                 statusCode: OK,
//                 data: {
//                     customerId,
//                     productId,
//                     orderId: "randomId",
//                     price: "13"
//                 },
//             });
//
//         const response = await OrderService.sendOrder({
//             customerId,
//             productId
//         });
//
//         expect(response.statusCode).equals(OK);
//         expect(response.data).to.exist;
//
//         findOneUser.restore();
//         sinon.assert.calledOnce(findOneUser);
//     });
//
// })
