import React from 'react';
import PropTypes from 'prop-types';
import { Card, CardContent, Typography } from '@mui/material';
import ListTable from '@components/table/ListTable';

const HistoryTable = (props) => {
  return (
    <Card>
      <CardContent>
        <Typography variant="h5" component="div">
          Transaction History
        </Typography>

        <ListTable tableHeadersList={[]} tableRowsList={[]} />
      </CardContent>
    </Card>
  );
};

HistoryTable.propTypes = {};

export default HistoryTable;
