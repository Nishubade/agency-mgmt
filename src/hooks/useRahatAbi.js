import { AppService } from '@services/app';
import { useCallback, useEffect, useState } from 'react';

export const useRahatAbi = () => {
  const [contract] = useState('rahat');
  const [abi, setAbi] = useState(null);

  const fetchContract = useCallback(async () => {
    const response = await AppService.getContract(contract);
    setAbi(response.data.abi);
  }, [contract]);

  useEffect(() => {
    fetchContract();
  }, [fetchContract]);

  return [contract, abi];
};
