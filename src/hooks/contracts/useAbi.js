import { AppService } from '@services/app';
import { useCallback, useEffect, useState } from 'react';

export const useAbi = (contract) => {
  const [abi, setAbi] = useState(null);

  const fetchContract = useCallback(async () => {
    const response = await AppService.getContract(contract);
    setAbi(response.data.abi);
  }, [contract]);

  useEffect(() => {
    fetchContract();
  }, [fetchContract]);

  return [abi, contract];
};
