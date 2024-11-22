import React from 'react';
import { GoogleMap, LoadScript } from '@react-google-maps/api';

const containerStyle = {
  width: '100%',
  height: '400px'
};

const center = {
  lat: 31.2001,
  lng: 29.9187
};

function SimpleMap() {
  const [isLoaded, setIsLoaded] = React.useState(false);
  const [loadError, setLoadError] = React.useState(null);

  const handleLoad = React.useCallback(() => {
    console.log('Google Maps Script loaded successfully');
    setIsLoaded(true);
  }, []);

  const handleError = React.useCallback((error) => {
    console.error('Error loading Google Maps:', error);
    setLoadError(error);
  }, []);

  if (loadError) {
    return (
      <div className="p-4 bg-red-100 text-red-700 rounded-md">
        Error loading Google Maps: {loadError.message}
      </div>
    );
  }

  return (
    <div className="relative">
      {!isLoaded && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100 rounded-md">
          <div className="text-gray-600">Loading map...</div>
        </div>
      )}
      
      <LoadScript
        googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY}
        onLoad={handleLoad}
        onError={handleError}
      >
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={center}
          zoom={10}
        >
        </GoogleMap>
      </LoadScript>
      
      <div className="mt-2 text-sm text-gray-600">
        API Key being used: {process.env.REACT_APP_GOOGLE_MAPS_API_KEY ? '✓ Present' : '✗ Missing'}
      </div>
    </div>
  );
}

export default SimpleMap;
