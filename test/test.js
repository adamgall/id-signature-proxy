const assert = require('assert');

// These JSON files contain the output from manually run API tests on the Postman app
const rootOutput = require('./root.json');
const enrollOutput = require('./enroll.json');
const verifyOutput = require('./verify.json');

const testPrivateKey = "9f4d02a89463ff0b631427297d0147b4ff9ba246794b5d5b64d9b41b1fe478f3";

import { publicAddress, sign } from '../src/api/helpers/ethereum';
import { translate, trim, combine, build } from '../src/api/proxy/proxyResponse';

describe('ethereum helper methods', function() {

  describe('publicAddress', function() {
    it('should return a public address given the private key for that address', function() {
      const output = publicAddress(testPrivateKey);

      assert.equal(rootOutput.publicAddress, output);
    });
  });

  describe('sign', function() {
    const payload = enrollOutput.blockchain.payload;
    const expectedSignature = enrollOutput.blockchain.signature;
    const signature = sign(payload, testPrivateKey);

    it('should return an object with r, s, and v keys', function() {
      ['r', 's', 'v'].forEach((key)=>{
        assert(signature.hasOwnProperty(key));
      });
    });

    it('should return a valid signature for a public address given the private key for that address', function() {
      assert.deepEqual(expectedSignature, signature);
    });
  });
});

describe('proxy response methods', function() {
  const testConfidencePercentage = 0.9;
  const testConfidenceLimit = 4294967295;

  describe('translate', function() {
    it('should convert a 0..1 float percentage to an integer', function() {
      const output = translate(testConfidencePercentage, testConfidenceLimit);

      assert(Number.isInteger(output));
    });

    it('should return the given percentage of the given integer', function() {
      const output = translate(testConfidencePercentage, testConfidenceLimit);
      const expectedOutput = Math.round(testConfidencePercentage * testConfidenceLimit);

      assert.equal(expectedOutput, output);
    });
  });

  describe('trim', function() {
    const output = trim(verifyOutput.kairos, testConfidenceLimit);

    it('should return an object with faceId, confidence, and subjectId keys', function() {
      ['faceId', 'confidence', 'subjectId'].forEach((key)=>{
        assert(output.hasOwnProperty(key));
      });
    });

    it('should return an object containing the correct values for those keys', function() {
      const deep = verifyOutput.kairos.images[0].transaction;
      const expectedOutput = {
        faceId: deep.face_id,
        confidence: translate(deep.confidence, testConfidenceLimit),
        subjectId: deep.subject_id
      };

      assert.deepEqual(expectedOutput, output);
    });
  });

  describe('combine', function() {
    it('should combine three objects into an object organizing them as prescribed', function() {
      const a = { a: 'a'}, b = { b: 'b'}, c = { c: 'c'};
      const expectedOutput = { blockchain: { payload: a, signature: b}, kairos: c}

      assert.deepEqual(expectedOutput, combine(a, b, c));
    });
  });

  describe('build', function() {
    it('should build a response object with original kairos body and blockchain info', function() {
      const testPayload = trim(verifyOutput.kairos, testConfidenceLimit);
      const testSignature = sign(testPayload, testPrivateKey);
      const expectedOutput = combine(testPayload, testSignature, verifyOutput.kairos);
      assert.deepEqual(expectedOutput, build(verifyOutput.kairos, testPrivateKey, testConfidenceLimit));
    });
  });
});