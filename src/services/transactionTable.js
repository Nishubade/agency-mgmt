import client from './client';

export const transactionList = () => client.get('/claimAcquiredERC20Transactions');
