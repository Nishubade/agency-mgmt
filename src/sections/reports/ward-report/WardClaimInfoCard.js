import { Box, Card, CardContent, Typography, useTheme } from '@mui/material';
import PropTypes from 'prop-types';
import { useEffect } from 'react';
import BarchartSingle from './BarchartSingle';
import { useModuleContext } from './context';

const WardClaimInfoCard = ({ selectedWard }) => {
  const theme = useTheme();
  const { wardByClaim, getWardClaimChart } = useModuleContext();

  useEffect(() => {
    if (!selectedWard) return;
    getWardClaimChart(selectedWard);
  }, [getWardClaimChart, selectedWard]);

  if (!selectedWard || selectedWard === 'undefined')
    return (
      <Card>
        <CardContent>
          <Typography variant="body1" sx={{ color: theme.palette.text.secondary }}>
            No Ward Selected
          </Typography>
          <Typography variant="h4" sx={{ color: theme.palette.text.secondary }}>
            Select a ward to view details
          </Typography>
        </CardContent>
      </Card>
    );

  return (
    <Box>
      <BarchartSingle
        title={`Ward Wise Claim Distribution for Ward ${selectedWard}`}
        chart={{
          colors: [
            theme.palette.primary.main,
            theme.palette.info.main,
            theme.palette.error.main,
            theme.palette.warning.main,
          ],
          options: {
            chart: {
              stacked: true,
            },
          },
          ...wardByClaim,
        }}
      />
    </Box>
  );
};

WardClaimInfoCard.propTypes = {
  selectedWard: PropTypes.string.required,
};

export default WardClaimInfoCard;
