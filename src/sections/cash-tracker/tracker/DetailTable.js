import React from 'react';
import PropTypes from 'prop-types';
import { Stack, Typography } from '@mui/material';
import ListTable from '@components/table/ListTable';
import { useAuthContext } from 'src/auth/useAuthContext';

const DetailTable = ({ selectedNode, list }) => {
  const { roles } = useAuthContext();

  const TABLE_HEADER = {
    name: {
      id: 'name',
      label: 'Name',
    },
    phone: {
      id: 'phone',
      label: 'Phone',
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

  if (!selectedNode)
    return (
      <Stack direction="column" justifyContent="center" alignItems="center" sx={{ height: '100%', p: 2, mt: 3 }}>
        <Typography variant="body3">Please select a node from the tree to view details</Typography>
      </Stack>
    );
  return (
    <Stack
      sx={{
        height: '100%',
        p: 2,
        mt: 3,
      }}
    >
      <ListTable
        tableRowsList={list.map((d) => {
          let { name, ...rest } = d;
          if (!roles.isPalika) name = 'xxxxxx';
          return { name, ...rest };
        })}
        tableHeadersList={TABLE_HEADER}
      />
    </Stack>
  );
};

DetailTable.propTypes = {
  selectedNode: PropTypes.object,
  list: PropTypes.array,
};

DetailTable.propTypes = {};

export default DetailTable;
