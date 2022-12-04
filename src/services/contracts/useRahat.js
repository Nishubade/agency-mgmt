import { CONTRACTS } from '@config';
import { useContract } from '@hooks/contracts';
import Web3Utils from '@utils/web3Utils';
import { useState } from 'react';
import { useAuthContext } from 'src/auth/useAuthContext';
import { BrainWallet } from '@ethersproject/experimental';

export const useRahat = () => {
  let { contracts } = useAuthContext();
  const contract = useContract(CONTRACTS.RAHAT);
  const cashContract = useContract(CONTRACTS.CASH);
  const registryContract = useContract(CONTRACTS.REGISTRY);
  const [rahatChainData, setRahatChainData] = useState({});
  const [vendorData, setVendorData] = useState({});
  const [beneficiaryData, setBeneficiaryData] = useState({ walletAddress: '0' });
  const handleError = (e) => console.log(e);

  return {
    contract,
    cashContract,
    rahatChainData,
    vendorData,
    beneficiaryData,

    //Vendor functions
    isVendor: (vendorAddress) => contract?.isVendor(vendorAddress).catch(handleError),
    addVendor: (vendorAddress) => contract?.addVendor(vendorAddress).catch(handleError),
    removeVendor: (vendorAddress) =>
      contract?.revokeRole(Web3Utils.keccak256('VENDOR'), vendorAddress).catch(handleError),
    listVendors: () => contract?.listVendors().catch(handleError),

    //Beneficiary functions
    suspendBeneficiary: (phone, projectId) =>
      contract?.suspendBeneficiary(phone, Web3Utils.keccak256(projectId)).catch(handleError),
    setAsBankedBeneficiary: (phone, isBanked) => contract?.setAsBankedBeneficiary(phone, isBanked).catch(handleError),

    async issueTokenToBeneficiary(projectId, phone, amount) {
      try {
        const benId = Web3Utils.keccak256(phone.toString());
        const key = Web3Utils.keccak256('9670');
        const benExists = await registryContract?.exists(benId);
        if (!benExists) {
          const benWallet = await BrainWallet.generate(benId, key, (p) =>
            console.log('Completed: ' + Math.trunc(100 * p) + '%')
          );
          await registryContract?.addId2AddressMap(benId, benWallet.address);
        }
        await contract?.issueERC20ToBeneficiary(projectId, phone, amount);
      } catch (e) {
        handleError(e);
      }
    },

    async claimTokenForProject(projectId, amount) {
      projectId = Web3Utils.keccak256(projectId);
      await contract?.claimTokenForProject(contracts[CONTRACTS.CASH], contracts[CONTRACTS.ADMIN], projectId, amount);
    },

    transferCashToVendor: (vendorAddress, amount) =>
      contract?.transferCashToVendor(vendorAddress, amount).catch(handleError),

    acceptCashForVendor: (vendorAddress, amount) =>
      contract?.acceptCashForVendor(vendorAddress, amount).catch(handleError),

    async projectBalance(projectId) {
      projectId = Web3Utils.keccak256(projectId);
      try {
        const projectBalanceData = await contract?.projectBalance(projectId, contracts[CONTRACTS.ADMIN]);
        const cashAllowance = await cashContract?.allowance(contracts[CONTRACTS.ADMIN], contracts[CONTRACTS.RAHAT]);
        const data = {
          totalBudget: projectBalanceData?.totalBudget?.toNumber(),
          tokenBalance: projectBalanceData?.tokenBalance?.toNumber(),
          cashBalance: projectBalanceData?.cashBalance?.toNumber(),
          cashAllowance: cashAllowance?.toNumber(),
        };
        setRahatChainData((d) => ({
          ...d,
          ...data,
        }));
        return data;
      } catch (e) {
        handleError(e);
      }
    },

    async vendorBalance(vendorAddress) {
      try {
        const vendorBalanceData = await contract?.vendorBalance(vendorAddress);
        const data = {
          walletAddress: vendorBalanceData?.walletAddress,
          cashAllowance: vendorBalanceData?.cashAllowance?.toNumber(),
          cashBalance: vendorBalanceData?.cashBalance?.toNumber(),
          tokenBalance: vendorBalanceData?.tokenBalance?.toNumber(),
          isActive: vendorBalanceData?.hasVendorRole,
        };
        setVendorData((d) => ({
          ...d,
          ...data,
        }));
        return data;
      } catch (e) {
        handleError(e);
      }
    },

    async beneficiaryBalance(phone) {
      try {
        const balanceData = await contract?.beneficiaryBalance(phone);
        const data = {
          walletAddress: balanceData?.walletAddress,
          totalTokenIssued: balanceData?.totalTokenIssued?.toNumber(),
          cashBalance: balanceData?.cashBalance?.toNumber(),
          tokenBalance: balanceData?.tokenBalance?.toNumber(),
          isBanked: balanceData?.hasBankAccount,
        };
        setBeneficiaryData((d) => ({
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
