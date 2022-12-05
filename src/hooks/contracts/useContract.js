import { Contract } from 'ethers';
import { useEffect, useState } from 'react';
import { useWallet } from '@hooks/useWallet';
import { useAbi } from './useAbi';

export const useContract = (contractName, contractAddress) => {
  const [abi] = useAbi(contractName);
  const [wallet, contracts] = useWallet();
  const [contract, setContract] = useState(null);

  useEffect(() => {
    if (contracts && abi?.length && contractName) {
      let con = new Contract(contractAddress || contracts[contractName], abi, wallet);
      setContract(con);
    }
  }, [abi]);

  return contract;
};
