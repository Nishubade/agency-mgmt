import { TextField } from '@mui/material';
import PropTypes from 'prop-types';
// import { useModuleContext } from '../context';

const InputForm = ({ label = '', ...others }) => (
  <TextField fullWidth value={''} label={label} type="search" {...others} />
);

InputForm.propTypes = {
  label: PropTypes.string,
};

export default InputForm;
