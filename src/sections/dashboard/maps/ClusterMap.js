import { useRef, memo } from 'react';
import Map, { Layer, Source } from 'react-map-gl';
//
import { clusterLayer, clusterCountLayer, unclusteredPointLayer } from './layers';

// ----------------------------------------------------------------------

function MapClusters({ mapData, ...other }) {
  const mapRef = useRef(null);

  const onClick = (event) => {
    const feature = event.features?.[0];

    const clusterId = feature?.properties?.cluster_id;

    const mapboxSource = mapRef.current?.getSource('earthquakes');

    mapboxSource.getClusterExpansionZoom(clusterId, (err, zoom) => {
      if (err) {
        return;
      }

      mapRef.current?.easeTo({
        center: feature?.geometry?.coordinates,
        zoom: Number.isNaN(zoom) ? 3 : zoom,
        duration: 500,
      });
    });
  };

  return (
    <>
      <Map
        initialViewState={{
          longitude: 85.3214668,
          latitude: 27.6933542,
          zoom: 3,
        }}
        interactiveLayerIds={[clusterLayer.id || '']}
        onClick={onClick}
        ref={mapRef}
        {...other}
      >
        <Source
          id="earthquakes"
          type="geojson"
          // data={mapData}
          data="https://docs.mapbox.com/mapbox-gl-js/assets/earthquakes.geojson"
          cluster
          clusterMaxZoom={14}
          clusterRadius={50}
        >
          <Layer {...clusterLayer} />
          <Layer {...clusterCountLayer} />
          <Layer {...unclusteredPointLayer} />
        </Source>
      </Map>
    </>
  );
}

export default memo(MapClusters);
