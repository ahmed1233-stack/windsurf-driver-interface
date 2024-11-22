import React, { useState, useCallback } from 'react';
import { GoogleMap, LoadScript, Marker, DirectionsRenderer } from '@react-google-maps/api';

const containerStyle = {
  width: '100%',
  height: '400px'
};

const defaultCenter = {
  lat: 31.2001, // Cairo's latitude
  lng: 29.9187  // Cairo's longitude
};

const MapComponent = ({ 
  pickupLocation, 
  deliveryLocation, 
  onPickupSelect, 
  onDeliverySelect,
  isInteractive = true 
}) => {
  const [directions, setDirections] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const onMapLoad = useCallback((loadedMap) => {
    setIsLoading(false);
  }, []);

  const onLoadError = useCallback((error) => {
    setError(error);
    setIsLoading(false);
  }, []);

  const handleMapClick = useCallback((e) => {
    if (!isInteractive) return;

    const clickedLocation = {
      lat: e.latLng.lat(),
      lng: e.latLng.lng()
    };

    // If pickup not set, set pickup, else set delivery
    if (!pickupLocation) {
      onPickupSelect?.(clickedLocation);
    } else if (!deliveryLocation) {
      onDeliverySelect?.(clickedLocation);
    }
  }, [pickupLocation, deliveryLocation, onPickupSelect, onDeliverySelect, isInteractive]);

  // Calculate and display route when both locations are set
  React.useEffect(() => {
    if (pickupLocation && deliveryLocation && window.google) {
      const directionsService = new window.google.maps.DirectionsService();

      directionsService.route(
        {
          origin: pickupLocation,
          destination: deliveryLocation,
          travelMode: window.google.maps.TravelMode.DRIVING,
        },
        (result, status) => {
          if (status === window.google.maps.DirectionsStatus.OK) {
            setDirections(result);
          } else {
            console.error(`Error fetching directions: ${status}`);
            setError('Failed to calculate route. Please try again.');
          }
        }
      );
    }
  }, [pickupLocation, deliveryLocation]);

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-md p-4 text-red-600">
        {error}
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="bg-gray-50 border border-gray-200 rounded-md p-4 text-gray-600">
        Loading map...
      </div>
    );
  }

  return (
    <LoadScript
      googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY}
      onError={onLoadError}
    >
      <div className="relative">
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={pickupLocation || defaultCenter}
          zoom={12}
          onClick={handleMapClick}
          onLoad={onMapLoad}
        >
          {pickupLocation && (
            <Marker
              position={pickupLocation}
              label={{
                text: "P",
                color: "white",
                className: "font-bold"
              }}
              title="Pickup Location"
            />
          )}
          {deliveryLocation && (
            <Marker
              position={deliveryLocation}
              label={{
                text: "D",
                color: "white",
                className: "font-bold"
              }}
              title="Delivery Location"
            />
          )}
          {directions && <DirectionsRenderer directions={directions} />}
        </GoogleMap>
        
        {isInteractive && (
          <div className="absolute bottom-4 left-4 bg-white px-4 py-2 rounded-md shadow-md text-sm">
            {!pickupLocation 
              ? "Click to set pickup location" 
              : !deliveryLocation 
                ? "Click to set delivery location" 
                : "Route calculated"}
          </div>
        )}
      </div>
    </LoadScript>
  );
};

export default MapComponent;
