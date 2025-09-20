import React, { useEffect, useRef, useState } from 'react';
import { Wrapper, Status } from '@googlemaps/react-wrapper';
import { Place } from './App';

const render = (status: Status) => {
  return <h1>{status}</h1>;
};

interface MapProps extends google.maps.MapOptions {
  style: { [key: string]: string };
  children?: React.ReactNode;
}

const Map: React.FC<MapProps> = ({ style, children, ...options }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [map, setMap] = useState<google.maps.Map>();

  useEffect(() => {
    if (ref.current && !map) {
      setMap(new window.google.maps.Map(ref.current, {}));
    }
  }, [ref, map]);

  useEffect(() => {
    if (map) {
      map.setOptions(options);
    }
  }, [map, options]);

  return (
    <>
      <div ref={ref} style={style} />
      {React.Children.map(children, (child) => {
        if (React.isValidElement(child)) {
          return React.cloneElement(child, { map });
        }
      })}
    </>
  );
};

const Marker: React.FC<google.maps.MarkerOptions & { map?: google.maps.Map }> = (options) => {
  const [marker, setMarker] = useState<google.maps.Marker>();

  useEffect(() => {
    if (!marker) {
      setMarker(new google.maps.Marker());
    }

    return () => {
      if (marker) {
        marker.setMap(null);
      }
    };
  }, [marker]);

  useEffect(() => {
    if (marker) {
      marker.setOptions(options);
    }
  }, [marker, options]);

  return null;
};

interface MapComponentProps {
  places: Place[];
}

const MapComponent: React.FC<MapComponentProps> = ({ places }) => {
  const [center, setCenter] = useState<google.maps.LatLngLiteral>({
    lat: 40.7128,
    lng: -74.006,
  });
  const [zoom, setZoom] = useState(10);

  useEffect(() => {
    if (places.length > 0) {
      setCenter(places[0].geometry.location);
      setZoom(12);
    }
  }, [places]);

  return (
    <Wrapper apiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY!} render={render}>
      <Map
        center={center}
        zoom={zoom}
        style={{ flexGrow: '1', height: '100%' }}
      >
        {places.map((place, i) => (
          <Marker key={i} position={place.geometry.location} title={place.name} />
        ))}
      </Map>
    </Wrapper>
  );
};

export default MapComponent;
