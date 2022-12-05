import { CONTRACTS } from '@config';
import { useContract } from '@hooks/contracts';
import { useAuthContext } from 'src/auth/useAuthContext';

export const useRahatDonor = () => {
  let { contracts } = useAuthContext();
  const contract = useContract(CONTRACTS.DONOR);
  const cashContract = useContract(CONTRACTS.CASH);
  const handleError = (e) => console.log(e);

  return {
    contract,
    cashContract,

    mintTokenAndApprove: (amount) =>
      contract?.mintTokenAndApprove(contracts[CONTRACTS.CASH], contracts[CONTRACTS.ADMIN], amount).catch(handleError),
    sendCashToAgency: async (amount) => {
      let agencyAllowance = await cashContract?.allowance(contracts[CONTRACTS.DONOR], contracts[CONTRACTS.ADMIN]);
      await contract?.mintToken(contracts[CONTRACTS.CASH], amount);
      await contract?.approveToken(
        contracts[CONTRACTS.CASH],
        contracts[CONTRACTS.ADMIN],
        parseInt(agencyAllowance.toNumber()) + +amount
      );
    },
  };
};
