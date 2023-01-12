import ListTable from '@components/table/ListTable';
import { useCommunicationsContext } from '@contexts/communications';
import { Button, Card, TableCell, TablePagination, TableRow } from '@mui/material';
import { useCallback, useEffect, useState } from 'react';
import Iconify from '@components/iconify';
import { useRouter } from 'next/router';
import moment from 'moment';

const TABLE_HEADERS = {
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

  type: {
    id: 'type',
    label: 'Type',
    align: 'left',
  },
  timestamp: {
    id: 'timestamp',
    label: 'Date',
    align: 'left',
  },

  status: {
    id: 'status',
    label: 'Status',
    align: 'left',
  },
};

const TableList = () => {
  const { getCommunicationsList, communicationsList } = useCommunicationsContext();
  const router = useRouter();

  const [pagination, setPagination] = useState({
    limit: 100,
    count: 0,
    start: 0,
  });

  const handleFetch = useCallback(async () => {
    const res = await getCommunicationsList({
      limit: pagination.limit,
      start: pagination.start,
    });
    setPagination((prev) => ({
      ...prev,
      limit: res.limit,
      start: res.start,
      count: res.count,
    }));
  }, [pagination.start, pagination.limit]);

  useEffect(() => {
    handleFetch();
  }, [handleFetch, pagination.start, pagination.limit]);

  const handleBeneficiaryView = (id) => () => {
    if (!id) return;
    router.push(`/beneficiaries/${id}`);
  };

  const paginationView = (
    <TablePagination
      component="div"
      count={pagination?.count}
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
    <Card>
      {paginationView}
      <ListTable tableHeadersList={TABLE_HEADERS} tableRowsList={communicationsList} footer={paginationView}>
        {(rows, tableHeadersList) =>
          rows.map(
            (row) =>
              row.beneficiaryId && (
                <TableRow key={row.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                  <TableCell align={tableHeadersList['to'].align}>
                    <Button
                      variant="text"
                      disabled={!row.beneficiaryId}
                      onClick={handleBeneficiaryView(row.beneficiaryId)}
                    >
                      {row.to}
                    </Button>
                  </TableCell>
                  <TableCell align={tableHeadersList['type'].align}>{row.type}</TableCell>
                  <TableCell align={tableHeadersList['timestamp'].align}>
                    {moment.unix(row.timestamp).format('DD/MM/YY, h:mm a')}
                  </TableCell>
                  <TableCell align={tableHeadersList['status'].align}>{row.status}</TableCell>
                </TableRow>
              )
          )
        }
      </ListTable>
    </Card>
  );
};

export default TableList;
