import { CONTRACTS } from '@config';
import { useContract } from '@hooks/contracts';
import Web3Utils from '@utils/web3Utils';
import { useState } from 'react';
import { useAuthContext } from 'src/auth/useAuthContext';

export const useRahat = () => {
  let { contracts } = useAuthContext();
  const contract = useContract(CONTRACTS.CASH);
  const handleError = (e) => console.log(e);

  return {
    contract,
    async claimToken() {
      //await cashContract.claimToken
    },
  };
};
