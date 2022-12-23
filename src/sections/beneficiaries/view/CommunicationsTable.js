import ListTable from '@components/table/ListTable';
import React from 'react';

const CommunicationsTable = ({ tableHeadersList, tableRowsList }) => {
  return <ListTable tableHeadersList={tableHeadersList} tableRowsList={tableRowsList} />;
};

export default CommunicationsTable;
