import React from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

const MapComponent = ({ onMapClick, selectedLocation }) => {
  const mapStyles = {
    height: "400px",
    width: "100%"
  };

  const defaultCenter = {
    lat: 0,
    lng: 0
  };

  const handleMapClick = (e) => {
    const clickedLocation = {
      lat: e.latLng.lat(),
      lng: e.latLng.lng()
    };
    onMapClick(clickedLocation);
  };

  return (
    <LoadScript googleMapsApiKey="AIzaSyA5pjE7sMhKpoCvlu0hxPTdu4-WWrorX-8">
      <GoogleMap
        mapContainerStyle={mapStyles}
        zoom={selectedLocation ? 15 : 2}
        center={selectedLocation || defaultCenter}
        onClick={handleMapClick}
      >
        {selectedLocation && <Marker position={selectedLocation} />}
      </GoogleMap>
    </LoadScript>
  );
};

export default MapComponent;
