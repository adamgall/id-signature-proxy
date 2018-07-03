import bodyParser from 'body-parser';
import cors from 'cors';
import express from 'express';
import HttpStatusCodes from 'http-status-codes';
import morgan from 'morgan';

import {
  API_PORT,
  REQUEST_SIZE_LIMIT
} from './config/constants';
import routes from './routes';

const errors = (err, req, res, next) => {
  console.error(JSON.stringify(err));
  res.status(err.status || HttpStatusCodes.INTERNAL_SERVER_ERROR);
  res.json(err.upstream || { error: "something broke" });
};

export default () => {
  const server = express();

  server.use(bodyParser.json({ limit: REQUEST_SIZE_LIMIT }));
  server.use(morgan("common"));
  server.use(cors());
  server.use(routes());
  server.use(errors);

  server.listen(API_PORT, () => {
    console.log(`Kairos Blockchain Proxy running on port ${API_PORT}.`);
  });
};
