import ethutils from 'ethereumjs-util';
import web3utils from 'web3-utils';

export const publicAddress = (signingKey) => {
  let address = "0x" + ethutils.privateToAddress("0x" + signingKey).toString('hex');
  return address;
};

export const sign = (payload, signingKey) => {
  const prefixLength = 2;
  const values = Object.keys(payload).map(key => payload[key]);
  let messageHash = web3utils.soliditySha3.apply(this, values);
  let hashNo0x = messageHash.substring(prefixLength, messageHash.length);
  let hashBuffer = new Buffer(hashNo0x, 'hex');
  let privateKey = new Buffer(signingKey, 'hex');
  let signature = ethutils.ecsign(hashBuffer, privateKey);
  let r = "0x" + signature.r.toString('hex'); // this is a Buffer
  let s = "0x" + signature.s.toString('hex'); // this is a Buffer
  let v = signature.v; // this is an Int
  return { r, s, v };
};

export default { publicAddress, sign };
