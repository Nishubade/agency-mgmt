import { useEffect, useState } from 'react';
import { Box, Tab } from '@mui/material';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import { Card, CardContent } from '@mui/material';
// import TabsTable from './TabsTable';
import { useRouter } from 'next/router';
import { HistoryTable } from '@sections/transactionTable';
import { useRahat } from '@services/contracts/useRahat';
import CommunicationsTable from './CommunicationsTable';
import { useBeneficiaryContext } from '@contexts/beneficiaries';

const tabs = [
  { value: 'transactionHistory', label: 'Transaction History' },
  { value: 'communications', label: 'Communications' },
];

// #region Table Headers
const TABLE_HEAD = {
  timestamp: {
    id: 'timestamp',
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

const communicationsTableHead = {
  // from: {
  //   id: 'from',
  //   label: 'From',
  //   align: 'left',
  // },
  to: {
    id: 'to',
    label: 'To',
    align: 'left',
  },

  timestamp: {
    id: 'timestamp',
    label: 'Date',
    align: 'left',
  },
  type: {
    id: 'type',
    label: 'Type',
    align: 'left',
  },

  duration: {
    id: 'duration',
    label: 'Duration (s)',
    align: 'left',
  },

  status: {
    id: 'status',
    label: 'Status',
    align: 'left',
  },
};
// #endregion
export default function ViewTabs({ transactionClaimLogs }) {
  const [value, setValue] = useState('transactionHistory');

  const {
    query: { beneficiaryId },
  } = useRouter();

  const { claimLogs } = useRahat();
  const { getCommunicationByBeneficiaryId, communicationsTableData } = useBeneficiaryContext();

  useEffect(() => {
    if (!beneficiaryId || value !== 'communications') return;
    getCommunicationByBeneficiaryId(beneficiaryId);
  }, [beneficiaryId, getCommunicationByBeneficiaryId, value]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Card>
      <CardContent>
        <Box sx={{ width: '100%', typography: 'body1' }}>
          <TabContext value={value}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
              <TabList onChange={handleChange} aria-label="lab API tabs example">
                {tabs.map((tab) => (
                  <Tab key={tab.value} label={tab.label} value={tab.value} />
                ))}
              </TabList>
            </Box>
            <TabPanel value="transactionHistory">
              <HistoryTable tableHeadersList={TABLE_HEAD} tableRowsList={transactionClaimLogs} />
            </TabPanel>
            <TabPanel value="communications">
              <CommunicationsTable tableHeadersList={communicationsTableHead} tableRowsList={communicationsTableData} />
            </TabPanel>
          </TabContext>
        </Box>
      </CardContent>
    </Card>
  );
}
