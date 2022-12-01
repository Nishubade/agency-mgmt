import ethers, { providers } from 'ethers';
import { useAuthContext } from 'src/auth/useAuthContext';

export const useWallet = (privateKey) => {
  let { chainUrl, wallet, contracts } = useAuthContext();
  if (privateKey) wallet = new ethers.Wallet(privateKey);
  return [wallet.connect(new providers.JsonRpcProvider(chainUrl)), contracts];
};
