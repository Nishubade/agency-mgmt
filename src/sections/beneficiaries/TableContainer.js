import { Box, Button, Pagination, TableCell, TablePagination, TableRow } from '@mui/material';
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

  const { getBeneficiariesList, beneficiaries, errorMessage, getAllWards, setPagination, pagination } =
    useBeneficiaryContext();

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
      show: roles.isPalika,
    },
    phone: {
      id: 'phone',
      label: 'Phone',
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
    tokenBalance: {
      id: 'tokenBalance',
      label: 'Token Balance',
      align: 'left',
    },
    cashBalance: {
      id: 'cashBalance',
      label: 'Cash Received',
      align: 'left',
    },
    // totalTokenIssued: {
    //   id: 'totalTokenIssued',
    //   label: 'Claimed Tokens',
    //   align: 'left',
    // },
    action: {
      id: 'action',
      label: 'Action',
      align: 'left',
    },
  };
  // #endregion

  const paginationView = (
    <TablePagination
      component="div"
      count={beneficiaries?.count}
      rowsPerPage={pagination.limit}
      page={+pagination.start}
      onPageChange={(e, page) => {
        setPagination({ start: page, limit: pagination.limit });
      }}
      variant="head"
      size="large"
      onRowsPerPageChange={(e) => {
        setPagination({ start: pagination.start, limit: +e.target.value });
      }}
    />
  );

  return (
    <Box>
      <ListTableToolbar />
      {paginationView}
      <ListTable
        footer={paginationView}
        tableRowsList={beneficiaries.data}
        tableHeadersList={TABLE_HEAD}
        errorMessage={errorMessage}
      >
        {(rows, tableHeadersList) =>
          rows.map((row) => (
            <TableRow key={row.name} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
              {roles.isPalika && <TableCell align={tableHeadersList['name'].align}>{row.name}</TableCell>}
              <TableCell align={tableHeadersList['phone'].align}>{row.phone}</TableCell>

              <TableCell align={tableHeadersList['registrationDate'].align}>
                {moment(row.registrationDate).format('MM/DD/YYYY')}
              </TableCell>
              <TableCell align={tableHeadersList['registeredBy'].align}>{row.registeredBy}</TableCell>

              <TableCell align={tableHeadersList['tokenBalance'].align}>{row.tokenBalance}</TableCell>
              <TableCell align={tableHeadersList['cashBalance'].align}>{row.cashBalance}</TableCell>
              {/* <TableCell align={tableHeadersList['totalTokenIssued'].align}>{row.totalTokenIssued}</TableCell> */}
              <TableCell align={tableHeadersList['action'].align}>
                <Button onClick={handleView(row.id)} variant="text">
                  <Iconify icon="ic:outline-remove-red-eye" />
                </Button>
              </TableCell>
            </TableRow>
          ))
        }
      </ListTable>
      {/* <Pagination
        variant="outlined"
        count={beneficiaries?.totalPage}
        page={+pagination.start}
        onChange={(e, page) => {
          setPagination({ start: page, limit: pagination.limit });
        }}
      /> */}
    </Box>
  );
};

export default TableContainer;
