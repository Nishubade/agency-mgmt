import client from '@utils/client';

export const transactionList = (params) =>
  client.get('/claimAcquiredERC20Transactions', {
    params,
  });
