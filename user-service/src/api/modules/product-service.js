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
export const getProduct = async (
  uri: string,
  retries: number,
  backOff: number
) => {
  const options = {
    method: "GET",
    uri,
    headers: {
      "User-Agent": "request",
    },
    auth: {
      user: process.env.PRODUCT_SERVICE_USERNAME,
      pass: process.env.PRODUCT_SERVICE_PASSWORD,
    },
    json: true,
  };
  return new Promise(async (resolve, reject) => {
    try {
      const response = await rp(options);
      resolve(response);
    } catch (e) {
      logger.error(`::: Request failed with error [${JSON.stringify(e)}] :::`);
      if (retries > 0) {
        setTimeout(() => {
          return getProduct(uri, retries - 1, backOff * 3);
        }, backOff);
      } else {
        reject(
          `Failed after number of [${retries}] with an error of [${JSON.stringify(
            e
          )}]`
        );
      }
    }
  });
};
