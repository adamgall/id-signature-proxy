import express from 'express';

import { know, enroll, verify } from './controllers/kairos';

const respond = (work, res, next) => {
  work.then((body) => {
    res.json(body);
  }).catch((error) => {
    next(error);
  });
};

export default () => {
  const router = express.Router();

  router.get("/", (req, res) => {
    res.json(know());
  });

  router.get("/healthz", (req, res) => {
    res.json();
  });

  router.post("/enroll", (req, res, next) => {
    respond(enroll(req), res, next);
  });

  router.post("/verify", (req, res, next) => {
    respond(verify(req), res, next);
  });

  return router;
};
