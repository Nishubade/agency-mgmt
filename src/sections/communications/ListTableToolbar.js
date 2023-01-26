import PropTypes from 'prop-types';
import { Button, Stack, Typography } from '@mui/material';
// components
// import ListSearchField from './ListSearchField';
import ListSelectFilter from './SelectFilter';
import { useCommunicationsContext } from '@contexts/communications';

// ----------------------------------------------------------------------

ListTableToolbar.propTypes = {};

const statusOptions = [
  {
    label: 'Success',
    value: 'success',
  },
  {
    label: 'Unanswered',
    value: 'unanswered',
  },
  {
    label: 'Failed',
    value: 'fail',
  },
  {
    label: 'Busy',
    value: 'busy',
  },
];

export default function ListTableToolbar() {
  const { filter, setFilter, wards, pagination } = useCommunicationsContext();

  const onSearch = (e) => {
    const { name, value } = e.target;
    if (!value) setFilter(null);
    else setFilter({ [name]: value });
  };

  return (
    <>
      <Stack direction={{ xs: 'column', sm: 'row' }} sx={{ position: 'absolute', right: 10, top: 10 }}>
        <img src="https://www.somleng.org/images/somleng_logo.png" width={80} />
      </Stack>
      <Stack spacing={2} direction={{ xs: 'column', sm: 'row' }} sx={{ py: 2.5, px: 0 }}>
        {/* <ListSelectFilter
          label={'Ward'}
          name={'ward'}
          options={wards}
          onSelectChange={onSearch}
          value={filter?.ward || ''}
        /> */}
        <ListSelectFilter
          label={'Status'}
          name={'status'}
          options={statusOptions}
          onSelectChange={onSearch}
          value={filter?.status || ''}
        />

        <Button
          variant="contained"
          onClick={() => {
            setFilter(null);
            // setPagination({ start: 0, limit: pagination.limit });
          }}
        >
          Clear
        </Button>
      </Stack>
    </>
  );
}
