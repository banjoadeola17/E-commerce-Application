import { describe, it } from "mocha";
import sinon from "sinon";
import nock from "nock";
import chai from "chai";
import chaiAsPromised from "chai-as-promised";
import * as OrderService from "../../../src/api/resources/order/order.service";
import { Order } from "../../../src/api/resources/order/order.model"
import {
    BAD_REQUEST,
    NOT_FOUND,
    OK,
    CONFLICT,
    UN_AUTHORISED,
} from "../../../src/api/modules/status";

chai.use(chaiAsPromised);
const expect = chai.expect;

describe("Order service tests", function () {

    it("should successfully fetch orders", async function () {

        const fetchOrders = sinon.stub(Order, "find").resolves([{
            productId:"Sample_product",
            customerId: "customerId",
        }]);

        const response = await OrderService.getOrders({customerId: "randonId"});

        expect(response.statusCode).equals(OK);
        expect(response.data).to.exist;

        fetchOrders.restore();
        sinon.assert.calledOnce(fetchOrders);
    });

    it("should successfully create an order", async function () {

        const data = {
            customerId: "randomUserId",
            productId: "randomProductId",
            price: "13"
        };

        sinon.stub(Order.prototype, "save").resolves({
            _id: "2bh2uxui2h",
            customerId: "randomUserId",
            productId: "randomProductId",
            price: "23"
        });

        const response = OrderService.createNewOrder(data);

        expect(response).to.exist;
    });
});

