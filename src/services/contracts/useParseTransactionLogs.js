import { useCallback } from 'react';

const { ethers } = require('ethers');

const useParseTransactionLogs = (abi) => {
  const parseTransactionLogs = useCallback(
    (logs) => {
      if (!logs) return [];
      if (!abi) return [];
      const iface = new ethers.utils.Interface(abi);

      const parsedLogs = logs.map((d) => {
        const topics = d.topics.filter((d) => d !== null);
        let log = iface.parseLog({
          data: d.data,
          topics,
        });

        const { blockNumber, timeStamp, transactionHash } = d;
        const { vendor, beneficiary, amount } = log.args;

        return {
          timeStamp: Number(timeStamp),
          transactionHash,
          blockNumber,
          vendor,
          beneficiary: beneficiary.toNumber(),
          amount: amount.toNumber(),
        };
      });
      return parsedLogs;
    },
    [abi]
  );

  return {
    parseTransactionLogs,
  };
};

export default useParseTransactionLogs;
