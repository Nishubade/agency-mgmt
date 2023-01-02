import { Upload } from '@components/upload';
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, Stack } from '@mui/material';
import { useCallback, useEffect, useState } from 'react';
import Iconify from '@components/iconify';

const UploadAudioDialog = ({
  title = 'Upload Files',
  open,
  onClose,
  //
  onCreate,
  onUpdate,
  //
  folderName,
  onChangeFolderName,
  handleClose,
  ...other
}) => {
  const [files, setFiles] = useState([]);

  useEffect(() => {
    if (!open) {
      setFiles([]);
    }
  }, [open]);

  const handleDrop = useCallback(
    (acceptedFiles) => {
      const newFiles = acceptedFiles.map((file) =>
        Object.assign(file, {
          preview: URL.createObjectURL(file),
        })
      );

      setFiles([...files, ...newFiles]);
    },
    [files]
  );

  const handleUpload = () => {
    onClose();
    console.log('ON UPLOAD');
  };

  const handleRemoveFile = (inputFile) => {
    const filtered = files.filter((file) => file !== inputFile);
    setFiles(filtered);
  };

  return (
    <Dialog open={open} onClose={handleClose} onBa>
      <DialogTitle>Upload Audio Files</DialogTitle>
      <DialogContent>
        <Box
          sx={{
            p: 1,
            mb: 1,
          }}
        >
          <Upload files={files} onDrop={handleDrop} onRemove={handleRemoveFile} />
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
