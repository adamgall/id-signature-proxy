import HttpStatusCodes from 'http-status-codes';
import request from 'request';

import { build } from './proxyResponse';

const options = (req, baseUrl, path) => {
  const method = req.method, url = path;
  const app_id = req.headers.app_id, app_key = req.headers.app_key;
  const headers = { app_id, app_key };
  const body = req.body, json = true;
  return { method, baseUrl, url, headers, body, json };
};

const work = (resolve, reject, status, body, signingKey, confidenceLimit) => {
  try {
    const sigResponse = build(body, signingKey, confidenceLimit);
    resolve(sigResponse);
  } catch (error) {
    reject({ status, body: error.stack });
  }
};

const callback = (resolve, reject, signingKey, confidenceLimit) => {
  return (error, response, body) => {
    const status = response.statusCode;
    if (body.Errors || response.statusCode !== HttpStatusCodes.OK) {
      reject({ status, upstream: body });
    } else {
      work(resolve, reject, status, body, signingKey, confidenceLimit);
    }
  }
};

const proxy = (req, baseUrl, path, signingKey, confidenceLimit) => {
  return new Promise((resolve, reject) => {
    const requestOptions = options(req, baseUrl, path);
    const responseCallback = callback(resolve, reject, signingKey, confidenceLimit);
    request(requestOptions, responseCallback);
  });
};

export default proxy;
