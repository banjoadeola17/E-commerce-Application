import logger from "../logger";
import rp from "request-promise";
import request from "request";
/**
 *
 * @param uri
 * @param payLoad : request body
 * @param retries : number of times the request should be retried
 * @param backOff : time taken to waite before retrying again
 * @returns {Promise<unknown>}
 *
 */
export const postPayment = async (
  uri: string,
  payLoad: any = {},
  retries: number,
  backOff,
) => {
  const options = {
    method: "POST",
    uri,
    headers: {
      "User-Agent": "request",
    },
    auth: {
      user: process.env.PAYMENT_SERVICE_USERNAME,
      pass: process.env.PAYMENT_SERVICE_PASSWORD,
    },
    body: payLoad,
    json: true,
  };
  return new Promise(async (resolve, reject) => {
    try {
      const response = await rp(options);
      resolve(response);
    } catch (e) {
      logger.error(`::: Request failed with error [${JSON.stringify(e)}] :::`);
    }
  });
};
