import { Chip, Table, TableBody, TableCell, TableContainer, TableRow } from '@mui/material';
import PropTypes from 'prop-types';
// import moment from 'moment';
import TableHeadCustom from './TableHeadCustom';

ListTable.propTypes = {
  size: PropTypes.string,
  tableRowsList: PropTypes.array.isRequired,
  tableHeadersList: PropTypes.object.isRequired,
  children: PropTypes.func.isRequired,
};

export default function ListTable({
  size = 'large',
  tableRowsList = [{ basic: 'Initial Table' }],
  tableHeadersList = {
    basic: {
      id: 'basic',
      label: 'basic',
      align: 'left',
    },
  },
  children,
}) {
  const conditionalRendering = (row, key) => {
    switch (key) {
      default:
        return row;
    }
  };

  const renderTableCell = (list, head) =>
    list.map((listItem, index) => (
      <TableRow key={`${listItem.id}-${index}`} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
        {Object.keys(head).map((headerKey) => {
          const tableKeyId = head[headerKey].id;
          return (
            <TableCell align={head[headerKey]?.align} component="th" scope="row" key={tableKeyId}>
              {listItem[tableKeyId] ? conditionalRendering(listItem[tableKeyId], tableKeyId) : <Chip label="N/A" />}
            </TableCell>
          );
        })}
      </TableRow>
    ));
  return (
    <TableContainer>
      <Table size={size}>
        <TableHeadCustom headLabel={tableHeadersList} />
        <TableBody>
          {children ? children(tableRowsList, tableHeadersList) : renderTableCell(tableRowsList, tableHeadersList)}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
