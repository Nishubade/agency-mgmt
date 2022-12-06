import { Box, Button, Chip, TableCell, TableRow } from '@mui/material';
import React, { useEffect } from 'react';
import ListTableToolbar from './ListTableToolbar';
import { useRouter } from 'next/router';
import Iconify from '@components/iconify';
import ListTable from '@components/table/ListTable';
import { useBeneficiaryContext } from '@contexts/beneficiaries';
import moment from 'moment';
import { useAuthContext } from 'src/auth/useAuthContext';

const TableContainer = () => {
  const router = useRouter();
  const { roles } = useAuthContext();

  const { getBeneficiariesList, beneficiaries, errorMessage, getAllWards } = useBeneficiaryContext();

  useEffect(() => {
    getBeneficiariesList();
  }, [getBeneficiariesList]);

  useEffect(() => {
    getAllWards();
  }, [getAllWards]);

  const handleView = (id) => () => {
    router.push(`/beneficiaries/${id}`);
  };

  // #region Table Headers
  const TABLE_HEAD = {
    name: {
      id: 'name',
      // id: 'timestamp',
      label: 'Name',
      align: 'left',
      // show: roles.isPalika,
    },
    phone: {
      id: 'phone',
      label: 'Phone',
      align: 'left',
    },
    address: {
      id: 'address',
      label: 'Address',
      align: 'left',
    },
    registrationDate: {
      id: 'registrationDate',
      label: 'Registration Date',
      align: 'left',
    },
    registeredBy: {
      id: 'registeredBy',
      label: 'Registered By',
      align: 'left',
    },
    balance: {
      id: 'balance',
      label: 'Balance',
      align: 'left',
    },
    action: {
      id: 'action',
      label: 'Action',
      align: 'left',
    },
  };
  // #endregion

  return (
    <Box>
      <ListTableToolbar />
      <ListTable tableRowsList={beneficiaries} tableHeadersList={TABLE_HEAD} errorMessage={errorMessage}>
        {(rows, tableHeadersList) =>
          rows.map((row) => (
            <TableRow key={row.name} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
              <TableCell align={tableHeadersList['name'].align}>{row.name}</TableCell>
              <TableCell align={tableHeadersList['phone'].align}>{row.phone}</TableCell>
              <TableCell align={tableHeadersList['address'].align}>{row.address}</TableCell>
              <TableCell align={tableHeadersList['registrationDate'].align}>
                {moment(row.registrationDate).format('MMMM Do, YYYY')}
              </TableCell>
              <TableCell align={tableHeadersList['registeredBy'].align}>{row.registeredBy}</TableCell>

              <TableCell align={tableHeadersList['balance'].align}>{row.balance}</TableCell>
              <TableCell align={tableHeadersList['action'].align}>
                <Button onClick={handleView(row.id)} variant="text">
                  <Iconify icon="ic:outline-remove-red-eye" />
                </Button>
              </TableCell>
            </TableRow>
          ))
        }
      </ListTable>
    </Box>
  );
};

export default TableContainer;
