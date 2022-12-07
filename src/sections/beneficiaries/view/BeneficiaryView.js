import { useCallback, useEffect } from 'react';
import { Grid, Stack } from '@mui/material';
import BasicInfoCard from './BasicInfoCard';
import TokenDetails from './TokenDetails';
import MoreInfoCard from './MoreInfoCard';
import ProjectsInvolved from './ProjectsInvolved';
import { HistoryTable } from '@sections/transactionTable';
import { useBeneficiaryContext } from '@contexts/beneficiaries';
import { useRouter } from 'next/router';
import { useRahat } from '@services/contracts/useRahat';
import { useRahatCash } from '@services/contracts/useRahatCash';
import { useAuthContext } from 'src/auth/useAuthContext';
import { useExplorer } from '@services/contracts/useExplorer';

BeneficiaryView.propTypes = {};

// #region Table Headers
const TABLE_HEAD = {
  date: {
    id: 'date',
    label: 'Date',
    align: 'left',
  },
  txHash: {
    id: 'txHash',
    label: 'Transaction Hash',
    align: 'left',
  },
  vendor: {
    id: 'vendor',
    label: 'Vendor',
    align: 'left',
  },
  amount: {
    id: 'amount',
    label: 'Amount',
    align: 'left',
  },
};
// #endregion

export default function BeneficiaryView() {
  const { roles } = useAuthContext();
  const { getBeneficiaryById, setChainData, chainData, refresh, refreshData, singleBeneficiary } =
    useBeneficiaryContext();
  const { beneficiaryBalance, contract, contractWS } = useRahat();
  const { contractWS: RahatCash } = useRahatCash();
  const { beneficiaryTransactions } = useExplorer(null, singleBeneficiary?.phone);

  console.log('beneficiaryTransactions', beneficiaryTransactions);

  const {
    query: { beneficiaryId },
  } = useRouter();

  const init = useCallback(async () => {
    if (!beneficiaryId) return;
    const _benData = await getBeneficiaryById(beneficiaryId);
    if (!_benData?.phone) return;
    const _chainData = await beneficiaryBalance(_benData?.phone);
    setChainData(_chainData);
  }, [beneficiaryId, contract, refresh]);

  useEffect(() => {
    init();
    RahatCash?.on('Approval', refreshData);
    RahatCash?.on('Transfer', refreshData);
    contractWS?.on('IssuedERC20', refreshData);
    return () => {
      contractWS?.removeAllListeners();
      RahatCash?.removeAllListeners();
    };
  }, [init, RahatCash, contractWS]);

  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <BasicInfoCard chainData={chainData} />
        </Grid>
        <Grid item xs={12} md={6}>
          <TokenDetails />
        </Grid>
        {/* <Grid item xs={12} md={4}>
            <MoreInfoCard />
          </Grid> */}
      </Grid>
      {roles.isAgencyOrPalika() && (
        <Stack>
          <MoreInfoCard />
        </Stack>
      )}
      {roles.isAgencyOrPalika() && (
        <Stack sx={{ mt: 1 }}>
          <ProjectsInvolved />
        </Stack>
      )}
      <Stack sx={{ mt: 1 }}>
        <HistoryTable tableHeadersList={TABLE_HEAD} list={beneficiaryTransactions} />
      </Stack>
    </>
  );
}
