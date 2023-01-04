import { Upload } from '@components/upload';
import { Alert, Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, Stack } from '@mui/material';
import { useCallback, useState } from 'react';
import Iconify from '@components/iconify';
import useAwsS3 from '@hooks/useAwsS3';
import { TwimlService } from '@services/twiml';
import { useErrorHandler } from '@hooks/useErrorHandler';

const UploadAudioDialog = ({
  open,
  onClose,
  onCreate,
  onUpdate,

  ...other
}) => {
  const awsS3 = useAwsS3();
  const { handleError } = useErrorHandler();

  const [file, setFile] = useState(null);

  const handleDropSingleFile = useCallback((acceptedFiles) => {
    const file = acceptedFiles[0];
    if (file) {
      setFile(
        Object.assign(file, {
          preview: URL.createObjectURL(file),
        })
      );
    }
  }, []);

  const handleUpload = async () => {
    // onClose();

    TwimlService.uploadAudio(file)
      .then(() => {
        setFile(null);
        onClose();
      })
      .catch(handleError);
    // awsS3
    //   .uploadFile(file)
    //   .then(() => {
    //     setFile(null);
    //     onClose();
    //   })
    //   .catch(handleError);
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Upload Audio Files</DialogTitle>
      <DialogContent>
        <Box
          sx={{
            p: 1,
            mb: 1,
          }}
        >
          {awsS3.s3Error && (
            <Alert severity="error" sx={{ mb: 1 }}>
              {awsS3.s3Error?.message}
            </Alert>
          )}
          <Upload file={file} onDrop={handleDropSingleFile} onDelete={() => setFile(null)} />
        </Box>
      </DialogContent>{' '}
      <DialogActions>
        <Button variant="contained" startIcon={<Iconify icon="eva:cloud-upload-fill" />} onClick={handleUpload}>
          Upload
        </Button>

        {/* {!!files.length && (
          <Button variant="outlined" color="inherit" onClick={handleRemoveAllFiles}>
            Remove all
          </Button>
        )} */}

        {(onCreate || onUpdate) && (
          <Stack direction="row" justifyContent="flex-end" flexGrow={1}>
            <Button variant="soft" onClick={onCreate || onUpdate}>
              {onUpdate ? 'Save' : 'Create'}
            </Button>
          </Stack>
        )}
      </DialogActions>
    </Dialog>
  );
};

export default UploadAudioDialog;
