import { useErrorHandler } from '@hooks/useErrorHandler';
import { ethers, utils } from 'ethers';
import { useCallback, useEffect, useState } from 'react';
import { useAuthContext } from 'src/auth/useAuthContext';
import { EthExplorerService } from '..';
import useParseTransactionLogs from './useParseTransactionLogs';

export const useVendorClaimLogs = (vendorAddress) => {
  const [vendorClaimData, setVendorClaimData] = useState([]);
  const { ERRORS, throwError, handleError } = useErrorHandler();

  const listVendorClaimTxs = useCallback(async () => {
    if (!vendorAddress) throwError(ERRORS.VENDOR_ADDRESS_REQ, 'useVendorClaimLogs');
    const { data } = await EthExplorerService.getLogs({
      module: 'logs',
      action: 'getLogs',
      fromBlock: 0,
      toBlock: 'latest',
      // todo: make dynamic
      address: '0x86EcDd932f5FE35D18a7D7b3C5095582340915A0',
      topic0: utils.id('ClaimAcquiredERC20(address,uint256,uint256)'),
    });
    console.log(data);
  }, [vendorAddress]);

  useEffect(() => {
    listVendorClaimTxs().catch(handleError);
  }, [listVendorClaimTxs, vendorAddress]);

  return {
    vendorClaimData,
  };
};

export const useExplorer = (vendorAddress, beneficiaryPhone) => {
  //#region State and Hooks
  const { contracts } = useAuthContext();
  const { parseTransactionLogs } = useParseTransactionLogs();
  const [vendorTransactions, setVendorTransactions] = useState([]);
  const [beneficiaryTransactions, setBeneficiaryTransactions] = useState([]);
  const [transactionLoading, setTransactionLoading] = useState(true);
  //#endregion

  //#region Vendor Transactions

  const listVendorClaimTxs = useCallback(async () => {
    const response = await EthExplorerService.getTransaction({
      module: 'logs',
      action: 'getLogs',
      fromBlock: 0,
      toBlock: 'latest',
      // todo: make dynamic
      address: '0x86EcDd932f5FE35D18a7D7b3C5095582340915A0',
      // address: contracts?.rahat,
      topic0: utils.id('ClaimAcquiredERC20(address,uint256,uint256)'),
      // topic1: vendorAddress,
      // topic0_1_opr: 'and',
    });
    const parsedLogs = parseTransactionLogs(response.result);
    console.log('parsedLogs', parsedLogs);
  }, [contracts?.rahat, vendorAddress]);

  const listVendorTxs = useCallback(async () => {
    const vendorClaimTxs = await listVendorClaimTxs();
    setTransactionLoading((prev) => !prev);

    console.log('first', {
      vendorClaimTxs,
    });
  }, [listVendorClaimTxs]);

  //#endregion

  //#region Beneficiary Transactions

  const listBeneficiaryClaimTxs = useCallback(async () => {
    const response = await EthExplorerService.getTransaction({
      module: 'logs',
      action: 'getLogs',
      fromBlock: 16112707,
      toBlock: 'latest',
      address: contracts?.rahat,
      topic0: utils.id('ClaimAcquiredERC20(address,uint256,uint256)'),
      topic2: ethers.utils.defaultAbiCoder.encode(['uint256'], [beneficiaryPhone]),
      topic0_2_opr: 'and',
    });
    return response.result;
  }, [contracts?.rahat, beneficiaryPhone]);

  const listBeneficiaryIssueTxs = useCallback(async () => {
    const response = await EthExplorerService.getTransaction({
      module: 'logs',
      action: 'getLogs',
      fromBlock: 16112707,
      toBlock: 'latest',
      address: contracts?.rahat,
      topic0: utils.id('IssuedERC20(_id, _phone, _amount)'),
      topic2: ethers.utils.defaultAbiCoder.encode(['uint256'], [beneficiaryPhone]),
      topic0_2_opr: 'and',
    });

    return response.result;
  }, [contracts?.rahat, beneficiaryPhone]);

  const listBeneficiaryTxs = useCallback(async () => {
    const benClaimTxs = await listBeneficiaryClaimTxs();
    const benIssueTxs = await listBeneficiaryIssueTxs();
    setTransactionLoading((prev) => !prev);

    console.log('first', {
      benClaimTxs,
      benIssueTxs,
    });
  }, [listBeneficiaryClaimTxs, listBeneficiaryIssueTxs]);

  //#endregion

  //#region Effects (Fetch Vendor Transactions)
  useEffect(() => {
    if (!vendorAddress) return;
    listVendorTxs();
  }, [listVendorTxs, vendorAddress]);

  //#endregion

  //#region Effects (Fetch Beneficiary Transactions)

  useEffect(() => {
    if (!beneficiaryPhone) return;
    listBeneficiaryTxs();
  }, [listBeneficiaryTxs, beneficiaryPhone]);

  //#endregion

  return {
    vendorTransactions,
    beneficiaryTransactions,
    transactionLoading,
  };
};
