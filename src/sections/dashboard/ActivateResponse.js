import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Typography from '@mui/material/Typography';
import { Button, Grid, Stack } from '@mui/material';
import truncateEthAddress from '@utils/truncateEthAddress';
import { useCallback, useEffect } from 'react';
import { useContractFunctions } from '@services/contract';

const responseStatus = [
  {
    title: 'Unicef-NP',
    status: 'Not Triggered',
    walletAddress: '0x0000000000000000000000000000000000000000',
  },
  {
    title: 'Palika',
    status: 'Not Triggered',
    walletAddress: '0x0000000000000000000000000000000000000000',
  },
];

export default function ActivateResponse() {
  const { listTriggerConfirmations } = useContractFunctions();

  const fetchFromB = useCallback(async () => {
    const res = await listTriggerConfirmations();
    console.log(res);
  }, [listTriggerConfirmations]);

  useEffect(() => {
    fetchFromB();
  }, [fetchFromB]);

  return (
    <Card>
      <CardHeader action={<Button>Not Activated</Button>} title="Multi-Sig Trigger Response" />

      <CardContent>
        {responseStatus.map((item, index) => (
          <Stack
            key={`${item.title}-${index}`}
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            spacing={12}
            sx={{ color: 'text.secondary' }}
          >
            <Grid container direction="column" justifyContent="center" alignItems="flex-start">
              <Typography variant="body1">{item.title}</Typography>
            </Grid>
            <Grid container direction="column" justifyContent="center" alignItems="flex-start">
              <Typography variant="body1">{truncateEthAddress(item.walletAddress)}</Typography>
            </Grid>
            <Grid container direction="column" justifyContent="center" alignItems="flex-start">
              <Typography variant="body1">{item.status}</Typography>
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
