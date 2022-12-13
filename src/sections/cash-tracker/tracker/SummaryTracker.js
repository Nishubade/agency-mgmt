import PropTypes from 'prop-types';
// @mui
import { styled } from '@mui/material/styles';
import {
  Box,
  Step,
  Stack,
  Stepper,
  StepLabel,
  StepConnector as MUIStepConnector,
  Grid,
  Typography,
  Card,
  CardHeader,
} from '@mui/material';
// components
import Iconify from '@components/iconify';

const STEPS = [
  {
    label: 'Unicef Innovation Fund',
    type: 'donor',
  },
  {
    label: 'Unicef Nepal',
    type: 'agency',
  },
  {
    label: 'Jaleshwor Palika',
    type: 'palika',
  },
  {
    label: 'Wards',
    type: 'wards',
  },
  {
    label: 'Beneficiaries',
    type: 'beneficiaries',
  },
];

// ----------------------------------------------------------------------

const StepConnector = styled(MUIStepConnector)(({ theme }) => ({
  top: 10,
  left: 'calc(-50% + 20px)',
  right: 'calc(50% + 20px)',
  '& .MuiStepConnector-line': {
    borderTopWidth: 2,
    borderColor: theme.palette.divider,
  },
  '&.Mui-active, &.Mui-completed': {
    '& .MuiStepConnector-line': {
      borderColor: theme.palette.primary.main,
    },
  },
}));

// ----------------------------------------------------------------------

SummaryTracker.propTypes = {
  trackerSummary: PropTypes.array,
  sx: PropTypes.object,
  activeStep: PropTypes.number,
};

export default function SummaryTracker({ trackerSummary, sx, ...other }) {
  const summary = STEPS.map((step) => ({
    ...step,
    ...trackerSummary[step.type],
  }));

  console.log('summary', summary);

  const activeStep = summary.findIndex((step) => !step?.isActive);

  return (
    <Card {...other}>
      <CardHeader title="Cash Tracker" />
      <Stepper alternativeLabel activeStep={activeStep} connector={<StepConnector />} sx={{ m: 2, ...sx }}>
        {summary.map((step) => (
          <Step key={step.label}>
            <StepLabel
              StepIconComponent={StepIcon}
              sx={{
                '& .MuiStepLabel-label': {
                  typography: 'subtitle2',
                },
              }}
            >
              <Stack direction="row" justifyContent="space-between" alignItems="center" spacing={12}>
                <Grid container direction="column" justifyContent="center" alignItems="center">
                  <Typography fontWeight={700} variant="caption">
                    {step?.label}
                  </Typography>

                  {step.totalClaim && <Typography variant="caption">Claim: {step.totalClaim} </Typography>}
                  {step.totalDisbursed && <Typography variant="caption">Disbursed: {step.totalDisbursed} </Typography>}

                  {step.budget && <Typography variant="caption">Budget: {step?.budget} </Typography>}
                  {step.balance > 0 && <Typography variant="caption">Balance: {step?.balance} </Typography>}
                  {step.received && <Typography variant="caption">Received: {step?.received} </Typography>}
                  {step.disbursed && <Typography variant="caption">Disbursed: {step?.disbursed} </Typography>}
                </Grid>
              </Stack>
            </StepLabel>
          </Step>
        ))}
      </Stepper>
    </Card>
  );
}

// ----------------------------------------------------------------------

StepIcon.propTypes = {
  active: PropTypes.bool,
  completed: PropTypes.bool,
};

function StepIcon({ active, completed }) {
  return (
    <Stack
      alignItems="center"
      justifyContent="center"
      sx={{
        width: 24,
        height: 24,
        color: 'text.disabled',
        ...(active && {
          color: 'primary.main',
        }),
      }}
    >
      {completed ? (
        <Iconify icon="eva:checkmark-fill" sx={{ color: 'primary.main' }} />
      ) : (
        <Box
          sx={{
            width: 8,
            height: 8,
            borderRadius: '50%',
            backgroundColor: 'currentColor',
          }}
        />
      )}
    </Stack>
  );
}
