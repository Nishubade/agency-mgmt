import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import ListSelectFilter from '../SelectFilter';
import { useBeneficiaryContext } from '@contexts/beneficiaries';
import { TWIML_API } from '@config';
import { SomlengService } from '@services/somleng';

const CallBeneficiary = ({ open, handleClose }) => {
  const { callBeneficiaryAudioList } = useBeneficiaryContext();
  const [selectedAudio, setSelectedAudio] = useState(null);

  const handleAudioSelect = (e) => {
    const { value } = e.target;
    setSelectedAudio(value);
  };

  const handleCall = async () => {
    if (!selectedAudio) return;
    const payload = {
      From: '9779801109726',
      To: '9779865430408',
      Url: `${TWIML_API}/audio/${selectedAudio}}`,
    };
    try {
      console.log('Calling Beneficiary...');
      const callResponse = await SomlengService.createCall(payload);
      console.log('callResponse', callResponse);
    } catch (err) {
      console.log('err', err);
    }
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Call Beneficiary</DialogTitle>
      <DialogContent>
        <Box
          sx={{
            p: 1,
            mb: 1,
          }}
          fullWidth
        >
          <ListSelectFilter
            value={selectedAudio}
            onSelectChange={handleAudioSelect}
            label="Select Audio to use"
            options={callBeneficiaryAudioList}
          />
        </Box>
      </DialogContent>
      <DialogActions>
        <Box sx={{ flex: 1 }} />
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={handleCall} variant="outlined">
          Call
        </Button>
      </DialogActions>
    </Dialog>
  );
};

CallBeneficiary.propTypes = {
  open: PropTypes.bool,
  handleClose: PropTypes.func,
};

export default CallBeneficiary;
