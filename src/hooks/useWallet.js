import ethers, { providers } from 'ethers';
import { useEffect, useRef, useState, useCallback } from 'react';
import { useAuthContext } from 'src/auth/useAuthContext';

export const useWallet = (privateKey) => {
  let { chainUrl, wallet } = useAuthContext();
  if (privateKey) wallet = new ethers.Wallet(privateKey);
  return wallet.connect(new providers.JsonRpcProvider(chainUrl));
};
