import { useCommunicationsContext } from '@contexts/communications';
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
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
import { TwimlService } from '@services/twiml';

const AudioList = () => {
  const { getAudiosList, audiosList } = useCommunicationsContext();

  const [openUploadModal, setOpenUploadModal] = useState(false);

  useEffect(() => {
    getAudiosList();
  }, [openUploadModal]);

  return (
    <>
      <UploadAudioDialog onClose={() => setOpenUploadModal((prev) => !prev)} open={openUploadModal} />
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
              <>
                <ListItem
                  secondaryAction={
                    <IconButton
                      edge="end"
                      aria-label="delete"
                      onClick={async () => {
                        await TwimlService.deleteAudio(item);
                        await getAudiosList();
                      }}
                    >
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
                <Divider />
              </>
            ))}
          </List>
        </CardContent>
      </Card>
    </>
  );
};

export default AudioList;
