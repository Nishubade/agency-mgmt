import { CONTRACTS } from '@config';
import { useContract } from '@hooks/contracts';
import Web3Utils from '@utils/web3Utils';

export const useRahatTrigger = () => {
  const contract = useContract(CONTRACTS.TRIGGER);
  const handleError = (e) => console.log(e);

  return {
    contract,
    isLive: () => contract?.isLive().catch(handleError),

    activateResponse: (projectId) => contract?.activateResponse(projectId).catch(handleError),

    deactivateResponse: (projectId) => contract?.deactivateResponse(projectId).catch(handleError),

    listTriggerConfirmations(projectId) {
      projectId = Web3Utils.keccak256(projectId);
      return contract
        ?.listAdmins()
        .then(async (admins) => {
          let adminConfirmations = [];
          for (let admin of admins) {
            adminConfirmations.push({
              name: 'Admin: ...' + admin.slice(-4),
              address: admin,
              isConfirmed: await contract?.adminConfirmations(projectId, admin),
            });
          }
          return adminConfirmations;
        })
        .catch(handleError);
    },
  };
};
