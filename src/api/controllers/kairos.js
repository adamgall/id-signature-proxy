import {
  BASE_URL,
  ENROLL_PATH,
  VERIFY_PATH,
  SIGNING_KEY,
  CONFIDENCE_LIMIT
} from '../config/constants';

import { publicAddress } from '../helpers/ethereum';
import proxy from '../proxy/proxyRequest';

const KairosController = {
  know: () => {
    return {
      publicAddress: publicAddress(SIGNING_KEY),
      confidenceLimit: CONFIDENCE_LIMIT
    }
  },

  enroll: (req) => {
    return proxy(req, BASE_URL, ENROLL_PATH, SIGNING_KEY, CONFIDENCE_LIMIT);
  },

  verify: (req) => {
    return proxy(req, BASE_URL, VERIFY_PATH, SIGNING_KEY, CONFIDENCE_LIMIT);
  }
};

module.exports = KairosController;
