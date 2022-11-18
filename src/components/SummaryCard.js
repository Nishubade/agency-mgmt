import PropTypes from 'prop-types';
// @mui
import { Box, Card, Typography, Stack } from '@mui/material';
// utils
import { fNumber } from '@utils/formatNumber';
// components

// ----------------------------------------------------------------------

// ----------------------------------------------------------------------

SummaryCard.propTypes = {
  title: PropTypes.string.isRequired,
  total: PropTypes.number.isRequired,
  sx: PropTypes.object,
};

export default function SummaryCard({ title, total, sx, ...other }) {
  return (
    <Card sx={{ display: 'flex', alignItems: 'center', p: 3, ...sx }} {...other}>
      <Box sx={{ flexGrow: 1 }}>
        <Typography variant="subtitle2">{title}</Typography>

        <Stack
          sx={{
            mt: 2,
            mb: 1,
            display: 'flex',
          }}
        >
          <Typography variant="h3">{fNumber(total)}</Typography>
        </Stack>
      </Box>
    </Card>
  );
}
