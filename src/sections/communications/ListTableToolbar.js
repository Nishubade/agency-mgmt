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
      <Stack>
        {filter && Object?.keys(filter).length > 0 && (
          <Typography
            sx={{
              color: 'text.secondary',
              fontSize: '0.875rem',
              fontWeight: 'bold',
              textTransform: 'uppercase',
              mb: 1,

              '& span:not(:last-of-type)::after': {
                content: '"|"',
                mx: 1,
              },

              '& span:last-of-type': {
                mx: 0.5,
              },
            }}
          >
            {Object.keys(filter).map((key) => (
              <span key={key}>
                Searching by "{key}" : {filter[key]}{' '}
              </span>
            ))}
          </Typography>
        )}
      </Stack>
      <Stack spacing={2} direction={{ xs: 'column', sm: 'row' }} sx={{ py: 2.5, px: 0 }} justifyContent={'flex-end'}>
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
