import client from '@utils/client';

// reporting and charts
export const getBeneficiaryCountByGender = () => client.get('/reporting/real-time/beneficiary/count-by-gender');

export const getBeneficiaryCountByGroup = () => client.get('/reporting/beneficiary/count-by-group');

export const getTransactionsCountByMethod = () => client.get('/reporting/transactions/count-by-method');

export const getTransactionsCountByMode = () => client.get('/reporting/transactions/count-by-mode');

export const getTransactionsCountByWard = (year) =>
  client.get('/reporting/real-time/transactions/count-by-ward', { params: { year } });

export const getStackedWardGender = () => client.get('/reporting/real-time/beneficiary/stacked-ward-gender');

export const getBeneficiariesCounts = () => client.get('/reporting/real-time/beneficiary/counts');

export const getBeneficiaryGroupingData = () => client.get('/reporting/end-of-day/beneficiary/grouping-data');

export const groupGenderByWard = (ward) =>
  client.get('/reporting/real-time/beneficiary/group-ward-gender', {
    params: {
      ward,
    },
  });

export const groupClaimByWard = (ward) =>
  client.get('/reporting/real-time/beneficiary/group-ward-claim', {
    params: {
      ward,
    },
  });

export const groupWardByLandOwnership = (ward) =>
  client.get('/reporting/real-time/beneficiary/group-ward-land-ownership', {
    params: {
      ward,
    },
  });

export const groupWardByDisability = (ward) =>
  client.get('/reporting/real-time/beneficiary/group-ward-disability', {
    params: {
      ward,
    },
  });
