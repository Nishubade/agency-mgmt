import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Typography from '@mui/material/Typography';
import { Button, Grid, Stack } from '@mui/material';
import truncateEthAddress from '@utils/truncateEthAddress';
import { useCallback, useEffect, useState } from 'react';
import { useRahatTrigger } from '@services/contracts/useRahatTrigger';
import { useAuthContext } from 'src/auth/useAuthContext';

export default function ActivateResponse() {
  const { roles } = useAuthContext();
  const { listTriggerConfirmations, isLive, contract } = useRahatTrigger();
  const [triggerAdmins, setTriggerAdmins] = useState([]);

  const fetchFromB = useCallback(async () => {
    //    let test = await isLive();
    let admins = await listTriggerConfirmations('637df143840a6865e08ebf20');
    setTriggerAdmins(admins);
  }, [contract]);

  useEffect(() => {
    fetchFromB();
  }, [fetchFromB]);

  return (
    <Card>
      <CardHeader action={<Button>Not Activated</Button>} title="Multi-Sig Trigger Response" />

      <CardContent>
        {triggerAdmins?.map((item, index) => (
          <Stack
            key={`${item.name}-${index}`}
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            spacing={12}
            sx={{ color: 'text.secondary' }}
          >
            <Grid container direction="column" justifyContent="center" alignItems="flex-start">
              <Typography variant="body1">{item.name}</Typography>
            </Grid>
            <Grid container direction="column" justifyContent="center" alignItems="flex-start">
              <Typography variant="body1">{truncateEthAddress(item.address)}</Typography>
            </Grid>
            <Grid container direction="column" justifyContent="center" alignItems="flex-start">
              <Typography variant="body1">{item.isConfirmed.toString()}</Typography>
            </Grid>
          </Stack>
        ))}
      </CardContent>
      <CardActions>
        <Stack
          sx={{
            mt: 0,
            p: 2,
            width: '100%',
          }}
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          spacing={12}
        >
          <Grid container direction="column" justifyContent="center" alignItems="start">
            <Button sx={{ mb: 1 }} variant="outlined">
              Activate Response
            </Button>
            <Typography variant="caption">
              Note: Response is activated when at least two admins have triggered.
            </Typography>
          </Grid>
        </Stack>
      </CardActions>
    </Card>
  );
}
