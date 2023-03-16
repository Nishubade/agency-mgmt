import { Card, CardContent, CardHeader, Chip, Grid, Stack, Typography } from '@mui/material';
import moment from 'moment';
import PropTypes from 'prop-types';

const log = ({ log = {}, totalAttempts = 0 }) => (
  <Card sx={{ width: '100%' }}>
    <CardHeader title={'Latest Log'} />
    <CardContent>
      <Stack sx={{ p: 2 }} direction="row" justifyContent="space-between" alignItems="center" spacing={12}>
        <Grid container direction="column" justifyContent="center" alignItems="flex-start">
          <Typography variant="body1">{moment.unix(log?.timestamp).format('DD MMM, YYYY')}</Typography>
          <Typography variant="caption">Date</Typography>
        </Grid>

        <Grid container direction="column" justifyContent="center" alignItems="flex-start">
          <Typography variant="body1">{log?.duration} </Typography>
          <Typography variant="caption">Duration</Typography>
        </Grid>
        <Grid container direction="column" justifyContent="center" alignItems="flex-start">
          <Typography variant="body1">{log?.ward} </Typography>
          <Typography variant="caption">Ward</Typography>
        </Grid>
        <Grid container direction="column" justifyContent="center" alignItems="flex-start">
          <Typography sx={{ textTransform: 'capitalize' }} variant="body1">
            {log?.type}{' '}
          </Typography>
          <Typography variant="caption">Method</Typography>
        </Grid>
        <Grid container direction="column" justifyContent="center" alignItems="flex-start">
          <Typography sx={{ textTransform: 'capitalize' }} variant="body1">
            {totalAttempts}
          </Typography>
          <Typography variant="caption">Total Attempts</Typography>
        </Grid>
        <Grid container direction="column" justifyContent="center" alignItems="flex-start">
          <Typography variant="body1">
            {log?.status === 'success' ? (
              <Chip
                variant="h5"
                color="success"
                sx={{
                  fontWeight: 600,
                  padding: 2,
                }}
                label="Success"
              />
            ) : (
              <Chip
                variant="h5"
                color="error"
                sx={{
                  fontWeight: 600,
                  padding: 2,
                }}
                label="Failed"
              />
            )}
          </Typography>
        </Grid>
      </Stack>
    </CardContent>
  </Card>
);

log.propTypes = {};

export default log;
