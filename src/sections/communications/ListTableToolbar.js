import { Box, Button, Stack, Typography } from '@mui/material';
// components
// import ListSearchField from './ListSearchField';
import ListSelectFilter from './SelectFilter';
import { useCommunicationsContext } from '@contexts/communications';
import ListSearchField from './ListSearchField';

// ----------------------------------------------------------------------

ListTableToolbar.propTypes = {};

const statusOptions = [
  {
    label: 'Success',
    value: 'success',
  },

  {
    label: 'Failed',
    value: 'fail',
  },
];

const isBankedOptions = [
  {
    label: 'Banked',
    value: 'banked',
  },
  {
    label: 'Unbanked',
    value: 'unbanked',
  },
];

export default function ListTableToolbar() {
  const { filter, setFilter, wards, pagination, setPagination } = useCommunicationsContext();

  const onSearch = (e) => {
    const { name, value } = e.target;
    if (!value) setFilter(null);
    else setFilter({ [name]: value });
  };

  return (
    <>
      <Stack p={2}>
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
      <Stack
        spacing={2}
        direction={{ xs: 'column', sm: 'row' }}
        sx={{
          py: 2.5,
          px: 0,
        }}
        justifyContent="space-between"
      >
        <ListSelectFilter
          label={'Ward'}
          name={'ward'}
          options={wards}
          onSelectChange={onSearch}
          value={filter?.ward || ''}
        />
        <ListSelectFilter
          label={'Status'}
          name={'status'}
          options={statusOptions}
          onSelectChange={onSearch}
          value={filter?.status || ''}
        />
        <ListSelectFilter
          label={'Banked/Unbanked'}
          name={'hasBank'}
          options={isBankedOptions}
          onSelectChange={onSearch}
          value={filter?.hasBank || ''}
        />
        {/* <ListSelectFilter
          label={'Phone/SMS'}
          name={'type'}
          options={phoneSmsOptions}
          onSelectChange={onSearch}
          value={filter?.type || ''}
        /> */}
        <ListSearchField label={'Phone'} name={'to'} onChange={onSearch} value={filter?.to || ''} on />

        <Button
          variant="contained"
          onClick={() => {
            setFilter(null);
            setPagination({ start: 0, limit: pagination.limit });
          }}
        >
          Clear
        </Button>
        <Box p={1} component="img" src="https://www.somleng.org/images/somleng_logo.png" width={80} />
      </Stack>
    </>
  );
}
