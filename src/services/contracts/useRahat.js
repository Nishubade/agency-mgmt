import { CONTRACTS } from '@config';
import { useContract } from '@hooks/contracts';
import Web3Utils from '@utils/web3Utils';
import { useState } from 'react';
import { useAuthContext } from 'src/auth/useAuthContext';

export const useRahat = () => {
  let { contracts } = useAuthContext();
  const contract = useContract(CONTRACTS.RAHAT);
  const [rahatChainData, setRahatChainData] = useState({});
  const handleError = (e) => console.log(e);

  return {
    contract,
    rahatChainData,
    ///getProjectBalace: () => contract?.isLive().catch(handleError),

    async claimTokenForProject(projectId, amount) {
      projectId = Web3Utils.keccak256(projectId);
      await contract?.claimTokenForProject(contracts[CONTRACTS.CASH], contracts[CONTRACTS.ADMIN], projectId, amount);
    },

    async transferCashToVendor(vendorAddress, amount) {
      await contract?.transferCashToVendor(vendorAddress, amount);
    },

    async getProjectBalance(projectId) {
      projectId = Web3Utils.keccak256(projectId);
      try {
        let data;
        try {
          const projectBalanceData = await contract?.projectBalance(projectId, contracts[CONTRACTS.ADMIN]);
          data = {
            totalBudget: projectBalanceData?.totalBudget?.toNumber(),
            tokenBalance: projectBalanceData?.tokenBalance?.toNumber(),
            cashBalance: projectBalanceData?.cashBalance?.toNumber(),
            cashAllowance: projectBalanceData?.cashAllowance?.toNumber(),
          };
        } catch (e) {
          data = {
            totalBudget: 0,
            tokenBalance: 0,
            cashBalance: 0,
            cashAllowance: 0,
          };
        }
        setRahatChainData((d) => ({
          ...d,
          ...data,
        }));
        return data;
      } catch (e) {
        handleError(e);
      }
    },
  };
};
