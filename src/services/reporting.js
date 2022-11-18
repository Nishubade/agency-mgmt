import client from './client';

// reporting and charts
export const getBeneficiaryCountByGender = () => client.get('/reporting/beneficiary/count-by-gender');

export const getBeneficiaryCountByGroup = () => client.get('/reporting/beneficiary/count-by-group');

export const getTransactionsCountByMethod = () => client.get('/reporting/transactions/count-by-method');

export const getTransactionsCountByMode = () => client.get('/reporting/transactions/count-by-mode');

export const getTransactionsCountByWard = (year) =>
  client.get('/reporting/transactions/count-by-ward', { params: { year } });

export const getBeneficiariesCounts = () => client.get('/reporting/beneficiary/counts');

export const getBeneficiaryGroupingData = () => client.get('/reporting/beneficiary/grouping-data');
