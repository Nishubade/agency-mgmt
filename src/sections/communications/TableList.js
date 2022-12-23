import ListTable from '@components/table/ListTable';
import { useCommunicationsContext } from '@contexts/communications';
import { Button, Card, TableCell, TableRow } from '@mui/material';
import { useEffect } from 'react';
import Iconify from '@components/iconify';
import { useRouter } from 'next/router';

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

  communication_type: {
    id: 'communication_type',
    label: 'Type',
    align: 'left',
  },
  date_created: {
    id: 'date_created',
    label: 'Date of Communication',
    align: 'left',
  },
  direction: {
    id: 'direction',
    label: 'Direction',
    align: 'left',
  },
  status: {
    id: 'status',
    label: 'Status',
    align: 'left',
  },

  actionUri: {
    id: 'actionUri',
    label: 'URI',
    align: 'left',
  },
  actionBeneficiaryView: {
    id: 'actionBeneficiaryView',
    label: 'View Beneficiary',
    align: 'left',
  },
};

const TableList = () => {
  const { getCommunicationsList, communicationsList } = useCommunicationsContext();
  const router = useRouter();

  useEffect(() => {
    getCommunicationsList();
  }, [getCommunicationsList]);

  const handleBeneficiaryView = (id) => () => {
    router.push(`/beneficiaries/${id}`);
  };

  return (
    <Card>
      <ListTable tableHeadersList={TABLE_HEADERS} tableRowsList={communicationsList}>
        {(rows, tableHeadersList) =>
          rows.map((row) => (
            <TableRow key={row.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
              <TableCell align={tableHeadersList['to'].align}>{row.to}</TableCell>
              <TableCell align={tableHeadersList['communication_type'].align}>{row.communication_type}</TableCell>
              <TableCell align={tableHeadersList['date_created'].align}>{row.date_created}</TableCell>
              <TableCell align={tableHeadersList['direction'].align}>{row.direction}</TableCell>
              <TableCell align={tableHeadersList['status'].align}>{row.status}</TableCell>

              <TableCell align={tableHeadersList['actionUri'].align}>
                <Button variant="text">
                  <Iconify icon="ic:outline-remove-red-eye" />
                </Button>
              </TableCell>
              {row?.isBeneficiary ? (
                <TableCell align={tableHeadersList['actionBeneficiaryView'].align}>
                  <Button variant="text" onClick={handleBeneficiaryView(row.beneficiaryId)}>
                    <Iconify icon="ic:outline-remove-red-eye" />
                  </Button>
                </TableCell>
              ) : (
                'Not a Beneficiary'
              )}
            </TableRow>
          ))
        }
      </ListTable>
    </Card>
  );
};

export default TableList;
