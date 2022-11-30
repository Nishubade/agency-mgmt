import { useRahatContract } from '@hooks/useRahatContract';

export const useContractFunctions = () => {
  const rahatContract = useRahatContract();

  const triggerResponse = async () => {
    try {
      const response = await rahatContract?.methods?.triggerResponse();
      console.log('response', response);
      return response;
    } catch (err) {
      console.log('err', err);
    }
  };

  return {
    triggerResponse,
  };
};
