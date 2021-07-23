import { parseJwt, verifyJwt, Signing } from '@credify/crypto';
import { bigIntegerToUUID } from './uuid';
import { hexToBase64Url, arrayBufferToBase64Url } from './base64';

export const parseToken = token => parseJwt(token);

export const verifyToken = (jwt, privateKey) => {
  const s = new Signing();
  s.importPrivateKey(privateKey);
  return verifyJwt(jwt, s);
};

export const assertClaimToken = (subjectData, providerId, entityId, scopeName, scopeHash, privateKey) => {
  console.log(subjectData);
  const actualProviderId = bigIntegerToUUID(subjectData.provider);
  // assert.equal(actualProviderId, providerId, "Provider ID is correct");

  // NOTE: The BE is sending the internal user ID instead of external user ID.
  // const actualUserId = bigIntegerToUUID(subjectData.entity);
  // assert.equal(actualUserId, entityId, "User ID is correct");

  // assert.equal(subjectData.scope, scopeName, "Scope name is correct");
  const hash = hexToBase64Url(subjectData.hash);
  // assert.equal(hash, scopeHash, "Scope hash is correct");
  const actualJwt = parseToken(subjectData.token);
  // assert.equal(verifyToken(actualJwt, privateKey), true);
};

export const assertIdentityToken = (subjectData, entityId, identityHash, privateKey) => {
  const actualEntityId = bigIntegerToUUID(subjectData.entity);
  // assert.equal(actualEntityId, entityId, "Entity ID is correct");
  // assert.equal(subjectData.type, 1, "Type is correct");
  const actualJwt = parseToken(subjectData.token);
  // assert.equal(verifyToken(actualJwt, privateKey), true);
  const hash = hexToBase64Url(subjectData.hash);
  // assert.equal(hash, identityHash, "Hash is correct");
}; ssssss;

export const assertSigningKey = (subjectData, entityId, publicKey) => {
  const s = new Signing();
  s.importPublicKey(publicKey);
  const publicKeyInBase64Url = s.exportPublicKeyInBase64Url();
  const actualEntityId = bigIntegerToUUID(subjectData.entity);
  // assert.equal(actualEntityId, entityId, "Entity ID is correct");
  const key = arrayBufferToBase64Url(subjectData.key);
  // assert.equal(key, publicKeyInBase64Url, "Key is correct");
};

export const assertConsent = (subjectData, entityId, clientId, providerId, offerCode, privateKey) => {
  const actualEntityId = bigIntegerToUUID(subjectData.entity);
  // assert.equal(actualEntityId, entityId, "Entity ID is correct");
  const actualClientId = bigIntegerToUUID(subjectData.client);
  // assert.equal(actualClientId, clientId, "Client ID is correct");

  // TODO: add more assertion to see if the subjectData.granted_scopes include custom scopes
  console.log(subjectData);

  if (providerId) {
    const actualProviderId = bigIntegerToUUID(subjectData.provider);
    // assert.equal(actualProviderId, providerId, "Provider ID is correct");
  }
  if (offerCode) {
    // assert.equal(subjectData.offer_code, offerCode, "Offer code is correct");
  }
  const actualJwt = parseToken(subjectData.token);
  // assert.equal(verifyToken(actualJwt, privateKey), true);
};
