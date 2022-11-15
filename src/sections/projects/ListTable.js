import { Button, Chip, Table, TableBody, TableCell, TableContainer, TableRow } from '@mui/material';
import PropTypes from 'prop-types';
// import moment from 'moment';
import TableHeadCustom from '@components/table/TableHeadCustom';

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
  return (
    <TableContainer>
      <Table size={size}>
        <TableHeadCustom headLabel={tableHeadersList} />
        <TableBody>{children(tableRowsList, tableHeadersList)}</TableBody>
      </Table>
    </TableContainer>
  );
}
