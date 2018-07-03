import { sign } from '../helpers/ethereum';

export const translate = (confidencePercentage, confidenceLimit) => {
  const translated = confidencePercentage * confidenceLimit;
  const intValue = Math.round(translated);
  return intValue;
};

export const trim = (body, confidenceLimit) => {
  const first = 0;
  const deep = body.images[first].transaction;
  const faceId = deep.face_id, confidence = translate(deep.confidence, confidenceLimit), subjectId = deep.subject_id;
  const payload = { faceId, confidence, subjectId };
  return payload;
};

export const combine = (payload, signature, kairos) => {
  const blockchain = { payload, signature };
  const fullResponse = { blockchain, kairos };
  return fullResponse;
};

export const build = (body, signingKey, confidenceLimit) => {
  const payload = trim(body, confidenceLimit);
  const signature = sign(payload, signingKey);
  const response = combine(payload, signature, body);
  return response;
};

export default { translate, trim, combine, build };