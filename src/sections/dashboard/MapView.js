import React from 'react';
import PropTypes from 'prop-types';
import { Card, CardContent, CardHeader } from '@mui/material';
import dynamic from 'next/dynamic';
import { MAPBOX_API } from '@config';
import styled from '@emotion/styled';

// sections
const MapClusters = dynamic(() => import('./MapSide'));

// ----------------------------------------------------------------------

const THEMES = {
  streets: 'mapbox://styles/mapbox/streets-v11',
  outdoors: 'mapbox://styles/mapbox/outdoors-v11',
  light: 'mapbox://styles/mapbox/light-v10',
  dark: 'mapbox://styles/mapbox/dark-v10',
  satellite: 'mapbox://styles/mapbox/satellite-v9',
  satelliteStreets: 'mapbox://styles/mapbox/satellite-streets-v11',
};

const baseSettings = {
  mapboxAccessToken: MAPBOX_API,
  minZoom: 1,
};

const StyledMapContainer = styled('div')(({ theme }) => ({
  zIndex: 0,
  height: 560,
  overflow: 'hidden',
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  '& .mapboxgl-ctrl-logo, .mapboxgl-ctrl-bottom-right': {
    display: 'none',
  },
}));

const MapView = (props) => {
  return (
    <div>
      {' '}
      <Card>
        <CardHeader title="Map View" />
        <CardContent>
          <StyledMapContainer>
            <MapClusters {...baseSettings} mapStyle={THEMES.light} />
          </StyledMapContainer>
        </CardContent>
      </Card>
    </div>
  );
};

MapView.propTypes = {};

export default MapView;
