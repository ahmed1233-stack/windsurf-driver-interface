import React from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

const containerStyle = {
  width: '100%',
  height: '200px'
};

const defaultCenter = {
  lat: 51.509865,
  lng: -0.118092
};

function LocationPicker({ location, onLocationSelect }) {
  const handleMapClick = (e) => {
    if (e.latLng) {
      const lat = e.latLng.lat();
      const lng = e.latLng.lng();
      
      // Convert coordinates to address using Geocoding service
      const geocoder = new window.google.maps.Geocoder();
      geocoder.geocode({ location: { lat, lng } }, (results, status) => {
        if (status === 'OK' && results[0]) {
          onLocationSelect(results[0].formatted_address, { lat, lng });
        }
      });
    }
  };

  return (
    <LoadScript googleMapsApiKey="YOUR_GOOGLE_MAPS_API_KEY">
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={location?.coordinates || defaultCenter}
        zoom={13}
        onClick={handleMapClick}
        options={{
          zoomControl: true,
          streetViewControl: false,
          mapTypeControl: false,
          fullscreenControl: false,
        }}
      >
        {location?.coordinates && (
          <Marker
            position={location.coordinates}
            animation={window.google.maps.Animation.DROP}
          />
        )}
      </GoogleMap>
    </LoadScript>
  );
}

export default LocationPicker;
