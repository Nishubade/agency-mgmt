import { Contract } from 'ethers';
import { useEffect, useState } from 'react';

export const useContract = (wallet, contracts, abi) => {
  const [contract, setContract] = useState(null);

  useEffect(() => {
    if (abi) {
      let con = new Contract(contracts, abi, wallet);
      setContract(con);
    }
  }, [abi, wallet, contracts]);

  return contract;
};
