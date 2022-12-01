import { useRahatContract } from '@hooks/useRahatContract';
import { useCallback } from 'react';
import { useAppAuthContext } from 'src/auth/JwtContext';

export const useContractFunctions = () => {
  const rahatContract = useRahatContract();
  const { addresses, claimToken, wallet } = useAppAuthContext();
  console.log('rahatContract', rahatContract);
  console.log('first', addresses, claimToken);

  const triggerResponse = async () => {
    try {
      const response = await rahatContract?.triggerResponse();
      return response;
    } catch (err) {
      console.log('err', err);
    }
  };

  const listTriggerConfirmations = useCallback(async () => {
    try {
      const response = await rahatContract?.listTriggerConfirmations(claimToken?.agencyId, {
        contractAddress: addresses?.rahat_trigger,
        wallet,
      });
      console.log('response', response);
      return response;
    } catch (err) {
      console.log('err', err);
    }
  }, []);
  // try {
  //   const response = await rahatContract?.listTriggerConfirmations();

  return {
    triggerResponse,
    listTriggerConfirmations,
  };
};
