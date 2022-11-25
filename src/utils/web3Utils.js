import EthCrypto from 'eth-crypto';
// import { ethers } from 'ethers';

export const getRandomString = (length) => {
  let randomChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += randomChars.charAt(Math.floor(Math.random() * randomChars.length));
  }
  return result;
};

export const getRandomEntropy = () => {
  const randomChars = getRandomString(128);
  return Buffer.from(randomChars, 'utf-8');
};

export const createRandomIdentity = () => {
  const entropy = getRandomEntropy();
  return EthCrypto.createIdentity(entropy);
};
