import { useCommunicationsContext } from '@contexts/communications';
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import Iconify from '@components/iconify';
import UploadAudioDialog from './UploadAudioDialog';

const AudioList = () => {
  const { getAudiosList, audiosList } = useCommunicationsContext();

  const [openUploadModal, setOpenUploadModal] = useState(false);

  useEffect(() => {
    getAudiosList();
  }, []);

  return (
    <>
      <UploadAudioDialog handleClose={() => setOpenUploadModal((prev) => !prev)} open={openUploadModal} />
      <Card>
        <CardHeader
          title="Audio List"
          action={
            <Button
              aria-label="settings"
              startIcon={<Iconify icon="material-symbols:upload" />}
              onClick={() => setOpenUploadModal((prev) => !prev)}
            >
              Upload Audio
            </Button>
          }
        />
        <CardContent>
          <List>
            {audiosList.map((item, index) => (
              <ListItem
                secondaryAction={
                  <IconButton edge="end" aria-label="delete" onClick={() => console.log('delete', item)}>
                    <Iconify icon="material-symbols:delete-outline" />
                  </IconButton>
                }
                disablePadding
                key={`${item}-${index}`}
              >
                <ListItemButton>
                  <ListItemText primary={item} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </CardContent>
      </Card>
    </>
  );
};

export default AudioList;
