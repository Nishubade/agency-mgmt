import PropTypes from 'prop-types';
import { Stack } from '@mui/material';
// components
import ListSearchField from './ListSearchField.js';
import ListSelectFilter from './SelectFilter';
import { useBeneficiaryContext } from '@contexts/beneficiaries.js';

// ----------------------------------------------------------------------

ListTableToolbar.propTypes = {};

export default function ListTableToolbar() {
  const { filter, setFilter, wards } = useBeneficiaryContext();

  const onSearch = (e) => {
    const { name, value } = e.target;
    if (!value) setFilter(null);
    else setFilter({ [name]: value });
  };

  return (
    <Stack spacing={2} direction={{ xs: 'column', sm: 'row' }} sx={{ py: 2.5, px: 0 }} justifyContent={'flex-end'}>
      {/* <ListSelectFilter label={'Phone'} /> */}
      <ListSelectFilter
        label={'Ward'}
        name={'ward'}
        options={wards}
        onSelectChange={onSearch}
        value={filter?.ward || ''}
      />
      <ListSearchField label={'Enter Phone'} value={filter?.phone || ''} onChange={onSearch} name={'phone'} />
      <ListSearchField label={'Enter Name'} value={filter?.name || ''} onChange={onSearch} name={'name'} />
    </Stack>
  );
}
