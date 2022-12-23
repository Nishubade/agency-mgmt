import ListTable from '@components/table/ListTable';
import { useCommunicationsContext } from '@contexts/communications';
import { Card } from '@mui/material';
import { useEffect } from 'react';

const TABLE_HEADERS = {
  from: {
    id: 'from',
    label: 'From',
    align: 'left',
  },
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
};

const TableList = () => {
  const { getCommunicationsList, communicationsList } = useCommunicationsContext();

  useEffect(() => {
    getCommunicationsList();
  }, [getCommunicationsList]);

  return (
    <Card>
      <ListTable tableHeadersList={TABLE_HEADERS} tableRowsList={communicationsList} />
    </Card>
  );
};

export default TableList;
