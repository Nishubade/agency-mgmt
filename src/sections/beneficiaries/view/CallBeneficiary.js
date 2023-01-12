import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import ListSelectFilter from '../SelectFilter';
import { useBeneficiaryContext } from '@contexts/beneficiaries';
import { PHONE_CODE, TWIML_API } from '@config';

const CallBeneficiary = ({ open, handleClose }) => {
  const { callBeneficiaryAudioList, getCallBeneficiaryAudioList, callBeneficiary, singleBeneficiary } =
    useBeneficiaryContext();
  const [selectedAudio, setSelectedAudio] = useState(null);
  const [callLoading, setCallLoading] = useState(false);

  useEffect(() => {
    if (!open) return;
    getCallBeneficiaryAudioList();
  }, [open]);
  const handleAudioSelect = (e) => {
    const { value } = e.target;
    setSelectedAudio(value);
  };

  const handleCall = async () => {
    if (!selectedAudio) return;
    setCallLoading(true);
    const payload = {
      From: '9779801109726',
      // To: '9779865430408',
      To: `${PHONE_CODE}${singleBeneficiary?.phone}`,
      Url: `${TWIML_API}/audio/${selectedAudio}`,
      // Url: `https://twiml.rahat.io/api/v1/audio/1-maithili.mp3`,
    };
    await callBeneficiary(payload);
    setCallLoading(false);
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
        <Button onClick={handleCall} variant="outlined" disabled={callLoading} loading={callLoading}>
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
