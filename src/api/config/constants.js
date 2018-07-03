import dotenv from 'dotenv';
dotenv.config();

const constants = {
  API_PORT: process.env.API_PORT,
  BASE_URL: process.env.BASE_URL,
  ENROLL_PATH: process.env.ENROLL_PATH,
  VERIFY_PATH: process.env.VERIFY_PATH,
  SIGNING_KEY: process.env.SIGNING_KEY,
  CONFIDENCE_LIMIT: process.env.CONFIDENCE_LIMIT,
  REQUEST_SIZE_LIMIT: process.env.REQUEST_SIZE_LIMIT
};

module.exports = constants;
