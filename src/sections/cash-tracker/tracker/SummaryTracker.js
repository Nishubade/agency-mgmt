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
    budget: 150000,
    balance: 0,
  },
  {
    label: 'Unicef Nepal',
    balance: 0,
  },
  {
    label: 'Jaleshwor Palika',
    balance: 120000,
    hasCash: true,
  },
  {
    label: 'Wards',
    balance: 200000,
    budget: 0,
  },
  {
    label: 'Beneficiaries',
    totalClaim: 0,
    totalDisbursed: 10,
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
  sx: PropTypes.object,
  activeStep: PropTypes.number,
};

export default function SummaryTracker({ activeStep, sx, ...other }) {
  return (
    <Card {...other}>
      <CardHeader title="Cash Tracker" />
      <Stepper alternativeLabel activeStep={activeStep} connector={<StepConnector />} sx={{ m: 2, ...sx }}>
        {STEPS.map((step) => (
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

                  {step.label === 'Beneficiaries' ? (
                    <>
                      <Typography variant="caption">Claim: {step.totalClaim} </Typography>
                      <Typography variant="caption">Disbursed: {step.totalDisbursed} </Typography>
                    </>
                  ) : (
                    <>
                      <Typography variant="caption">Budget: {step?.budget} </Typography>
                      <Typography variant="caption">Balance: {step?.balance} </Typography>
                    </>
                  )}
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
