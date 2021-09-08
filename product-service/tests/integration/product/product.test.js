import { describe, it } from "mocha";
import sinon from "sinon";
import nock from "nock";
import chai from "chai";
import chaiAsPromised from "chai-as-promised";
import * as ProductService from "../../../src/api/resources/product/product.service";
import { Product } from "../../../src/api/resources/product/product.model"
import {
    BAD_REQUEST,
    NOT_FOUND,
    OK,
    CONFLICT,
    UN_AUTHORISED,
} from "../../../src/api/modules/status";

chai.use(chaiAsPromised);
const expect = chai.expect;

describe("Product service tests", function () {
    it("should successfully fetch a product", async function () {

        const findOneProduct = sinon.stub(Product, "findOne").resolves({
            productDescription:"Sample product description",
            price: 24,
        });

        const response = await ProductService.getProduct({_id: "randonId"});

        expect(response.statusCode).equals(OK);
        expect(response.data).to.exist;

        findOneProduct.restore();
        sinon.assert.calledOnce(findOneProduct);
    });
});
