import Joi from "joi";
import { BAD_REQUEST, OK } from "../../modules/status";
import {Customer} from "./customer.model";
import logger from "../../logger";

export const getUser = async (customerId) => {
  try {
    const existingUser = await Customer.findOne({ _id: customerId });
    if (!existingUser) {
      return Promise.reject({
        statusCode: NOT_FOUND,
        message: "User not found.",
      });
    }
    logger.info(
      `::: Existing user found with a response [${JSON.stringify(
        existingUser
      )}] :::`
    );
    return Promise.resolve({
      statusCode: OK,
      data: existingUser,
    });
  } catch (err) {
    logger.error(`::: User not found with error [${JSON.stringify(err)}] :::`);
    return Promise.reject({
      statusCode: BAD_REQUEST,
      message: "Could not find user. Please try again",
    });
  }
};
