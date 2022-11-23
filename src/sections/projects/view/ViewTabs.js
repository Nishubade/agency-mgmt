import { useState } from 'react';
import { Box, Tab } from '@mui/material';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import { Card, CardContent } from '@mui/material';
import TabsTable from './TabsTable';
import { BEN_TABLE_HEAD, MOB_TABLE_HEAD, VEN_TABLE_HEAD, beneficiaryRows, mobilizers, vendors } from './tableData';

const tabs = [
  { value: 'beneficiaries', label: 'Beneficiaries' },
  { value: 'vendors', label: 'Vendors' },
  { value: 'mobilizers', label: 'Mobilizers' },
];

export default function ViewTabs() {
  const [value, setValue] = useState('beneficiaries');

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
            <TabPanel value="beneficiaries">
              <TabsTable rows={beneficiaryRows} tableHead={BEN_TABLE_HEAD} />
            </TabPanel>
            <TabPanel value="vendors">
              {' '}
              <TabsTable rows={vendors} tableHead={VEN_TABLE_HEAD} />
            </TabPanel>
            <TabPanel value="mobilizers">
              {' '}
              <TabsTable rows={mobilizers} tableHead={MOB_TABLE_HEAD} />
            </TabPanel>
          </TabContext>
        </Box>
      </CardContent>
    </Card>
  );
}
