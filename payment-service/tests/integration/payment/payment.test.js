import { describe, it } from "mocha";
import sinon from "sinon";
import nock from "nock";
import chai from "chai";
import chaiAsPromised from "chai-as-promised";
import * as PaymentService from "../../../src/api/resources/payment/payment.service";
import { Transaction } from "../../../src/api/resources/payment/payment.model"
import {
    BAD_REQUEST,
    NOT_FOUND,
    OK,
    CONFLICT,
    UN_AUTHORISED,
} from "../../../src/api/modules/status";

chai.use(chaiAsPromised);
const expect = chai.expect;

describe("Payment service tests", function () {
    it("should successfully create a transaction", async function () {

        const data = {
            customerId: "randomUserId",
            productId: "randomProductId",
            orderId: "randomId",
            price: "13"
        };

        sinon.stub(Transaction.prototype, "save").resolves({
            _id: "2bh2uxui2h",
            customerId: "randomUserId",
            productId: "randomProductId",
            orderId: "randomId"
        });

        const response = PaymentService.createTransaction(data);

        expect(response).to.exist;
    });
});

