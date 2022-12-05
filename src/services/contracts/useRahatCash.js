import { CONTRACTS } from '@config';
import { useContract } from '@hooks/contracts';
import { useAuthContext } from 'src/auth/useAuthContext';

export const useRahatCash = () => {
  let { contracts } = useAuthContext();
  const contract = useContract(CONTRACTS.CASH);
  const handleError = (e) => console.log(e);

  return {
    contract,
    name: () => contract?.name().catch(handleError),
    symbol: () => contract?.symbol().catch(handleError),
    decimal: () => contract?.decimal().catch(handleError),
    totalSupply: () => contract?.totalSupply().catch(handleError),
    checkAllowance: (from, to) => contract?.allowance(from, to).catch(handleError),
    checkBalance: (address) => contract?.balanceOf(address).catch(handleError),
    getDonorBalance: () => contract?.balanceOf(contracts[CONTRACTS.DONOR]).catch(handleError),
    getAgencyBalance: () => contract?.balanceOf(contracts[CONTRACTS.ADMIN]).catch(handleError),
    getPalikaBalance: () => contract?.balanceOf(contracts[CONTRACTS.RAHAT]).catch(handleError),
    getAgencyAllowance: () =>
      contract?.allowance(contracts[CONTRACTS.DONOR], contracts[CONTRACTS.ADMIN]).catch(handleError),
    getPalikaAllowance: () =>
      contract?.allowance(contracts[CONTRACTS.ADMIN], contracts[CONTRACTS.RAHAT]).catch(handleError),
    getVendorAllowance: (address) => contract?.allowance(contracts[CONTRACTS.RAHAT], address).catch(handleError),
  };
};
