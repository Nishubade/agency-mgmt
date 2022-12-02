import * as React from 'react';
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

AmountForm.propTypes = {
  sendCash: PropTypes.func,
  handleClose: PropTypes.func,
  open: PropTypes.bool,
};

export default function AmountForm({ sendCash, open, handleClose, ...other }) {
  const handleSendCash = (e) => {};
  return (
    <div>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Send Amount to Palika</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please select the amount you wish to send to palika. Palika has to accept the cash before it is fully
            transferred and allowed for disbursement.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Amount to send"
            type="number"
            fullWidth
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSendCash}>Subscribe</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
