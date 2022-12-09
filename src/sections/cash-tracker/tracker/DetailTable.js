import React from 'react';
import PropTypes from 'prop-types';
import { Stack, Typography } from '@mui/material';
import ListTable from '@components/table/ListTable';

const TABLE_HEADER = {
  name: {
    id: 'name',
    label: 'Name',
  },
  age: {
    id: 'age',
    label: 'Age',
  },
  gender: {
    id: 'gender',
    label: 'Gender',
  },
  claimed: {
    id: 'claimed',
    label: 'Claimed',
  },
  tokenIssued: {
    id: 'tokenIssued',
    label: 'Token Issued',
  },
};

const DetailTable = ({ selectedNode, list }) => {
  if (!selectedNode)
    return (
      <Stack direction="column" justifyContent="center" alignItems="center" sx={{ height: '100%', p: 2 }}>
        <Typography variant="h6">Please select a node from the tree to view details</Typography>
      </Stack>
    );
  return (
    <Stack
      sx={{
        height: '100%',
        p: 2,
      }}
    >
      <ListTable tableRowsList={list} tableHeadersList={TABLE_HEADER} />
    </Stack>
  );
};

DetailTable.propTypes = {
  selectedNode: PropTypes.object,
  list: PropTypes.array,
};

DetailTable.propTypes = {};

export default DetailTable;
