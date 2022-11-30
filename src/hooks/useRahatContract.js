import { Contract } from 'ethers';
import { useEffect, useState } from 'react';
import { useAuthContext } from 'src/auth/useAuthContext';
import { useRahatAbi } from './useRahatAbi';
import { useWallet } from './useWallet';

export const useRahatContract = () => {
  const { contracts } = useAuthContext();
  const wallet = useWallet();
  const [_, abi] = useRahatAbi();
  const [contract, setContract] = useState(null);

  useEffect(() => {
    if (abi) {
      let con = new Contract(contracts.rahat, abi, wallet);
      setContract(con);
    }
  }, [abi, wallet, contracts.rahat]);

  return contract;
  //   return new Contract(contracts?.rahat, abi, wallet?.provider);
};
