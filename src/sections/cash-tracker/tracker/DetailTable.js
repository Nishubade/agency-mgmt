import React from 'react';
import PropTypes from 'prop-types';
import { Stack, Typography } from '@mui/material';
import ListTable from '@components/table/ListTable';

const DetailTable = ({ selectedNode }) => {
  if (!selectedNode)
    return (
      <Stack direction="column" justifyContent="center" alignItems="center" sx={{ height: '100%', p: 2 }}>
        <Typography variant="h6">Please select a node from the tree to view details</Typography>
      </Stack>
    );
  return (
    <Stack>
      {JSON.stringify(selectedNode)}
      <ListTable />
    </Stack>
  );
};

DetailTable.propTypes = {
  selectedNode: PropTypes.object,
};

DetailTable.propTypes = {};

export default DetailTable;
