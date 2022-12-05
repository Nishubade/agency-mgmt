import { BLOCKCHAIN_EXPLORER } from '@config';
import { Button, Chip, Table, TableBody, TableCell, TableContainer, TableRow } from '@mui/material';
import truncateEthAddress from '@utils/truncateEthAddress';
import PropTypes from 'prop-types';
import moment from 'moment';
import TableHeadCustom from './TableHeadCustom';

ListTable.propTypes = {
  size: PropTypes.string,
  tableRowsList: PropTypes.array.isRequired,
  tableHeadersList: PropTypes.object.isRequired,
  children: PropTypes.node,
  footer: PropTypes.node,
  errorMessage: PropTypes.node,
};

export default function ListTable({
  size = 'small',
  tableRowsList = [{ basic: 'Initial Table' }],
  tableHeadersList = {
    basic: {
      id: 'basic',
      label: 'basic',
      align: 'left',
    },
  },
  children,
  errorMessage,
  footer,
  ...other
}) {
  const conditionalRendering = (row, key) => {
    switch (key) {
      case 'txHash':
        return (
          <Button href={`${BLOCKCHAIN_EXPLORER}${row}`} target="_blank" rel="noopener noreferrer">
            {truncateEthAddress(row)}
          </Button>
        );
      case 'timestamp':
        return moment.unix(row).fromNow();
      case 'createdAt':
        return moment(row).fromNow();
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
      {errorMessage && <div>{errorMessage}</div>}
      <Table size={size} stickyHeader {...other}>
        <TableHeadCustom headLabel={tableHeadersList} />
        <TableBody>
          {children ? children(tableRowsList, tableHeadersList) : renderTableCell(tableRowsList, tableHeadersList)}
        </TableBody>
      </Table>
      {footer}
    </TableContainer>
  );
}
