import { describe, it } from "mocha";
import sinon from "sinon";
import nock from "nock";
import chai from "chai";
import chaiAsPromised from "chai-as-promised";
import * as CustomerService from "../../../src/api/resources/customer/customer.service";
import { Customer } from "../../../src/api/resources/customer/customer.model"
import {
    BAD_REQUEST,
    NOT_FOUND,
    OK,
    CONFLICT,
    UN_AUTHORISED,
} from "../../../src/api/modules/status";

chai.use(chaiAsPromised);
const expect = chai.expect;

describe("Customer service tests", function () {
    it("should successfully fetch a user", async function () {

        const findOneUser = sinon.stub(Customer, "findOne").resolves({
            firstName:"Michel",
            lastName:"Hills",
            email:"Mathew4@gmail.com"
        });

        const response = await CustomerService.getUser({_id: "randonId"});

        expect(response.statusCode).equals(OK);
        expect(response.data).to.exist;

        findOneUser.restore();
        sinon.assert.calledOnce(findOneUser);
    });
});
