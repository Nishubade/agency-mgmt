import React from 'react';
import PropTypes from 'prop-types';
import { Card, CardContent, CardHeader, Typography } from '@mui/material';
import ListTable from '@components/table/ListTable';

const HistoryTable = ({ tableRowsList, tableHeadersList, ...other }) => (
  <Card>
    <CardHeader title={'Transaction History'} />

    <CardContent>
      <ListTable tableHeadersList={tableHeadersList} tableRowsList={tableRowsList} {...other} />
    </CardContent>
  </Card>
);

HistoryTable.propTypes = {
  tableRowsList: PropTypes.array,
  tableHeadersList: PropTypes.array,
};

export default HistoryTable;
