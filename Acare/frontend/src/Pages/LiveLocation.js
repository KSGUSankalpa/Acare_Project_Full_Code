import React, { useState, useEffect } from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import Navbar from '../components/Navbar';
import './LiveLocation.css';
import '../Assets/location.png';

const containerStyle = {
  width: '100%',
  height: '700px'
};

function LiveLocation() {
  // Set the initial coordinates to the specified location
  const [currentPosition, setCurrentPosition] = useState({ lat: 6.808690437642963, lng: 79.99116781390816 });
  const [mapLoaded, setMapLoaded] = useState(false);

  useEffect(() => {
    // Prompt for location permission and get the current position if available
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setCurrentPosition({
          lat: position.coords.latitude,
          lng: position.coords.longitude
        });
      },
      (error) => {
        console.error("Error getting location: ", error);
      },
      { enableHighAccuracy: true }
    );

    const watchId = navigator.geolocation.watchPosition(
      (position) => {
        setCurrentPosition({
          lat: position.coords.latitude,
          lng: position.coords.longitude
        });
      },
      (error) => {
        console.error("Error watching location: ", error);
      },
      { enableHighAccuracy: true }
    );

    // Cleanup the watchPosition on component unmount
    return () => navigator.geolocation.clearWatch(watchId);
  }, []);

  const handleMapLoad = () => {
    setMapLoaded(true);
  };

  return (
    <div className='location'>
      <Navbar />
      <LoadScript googleMapsApiKey="AIzaSyBmWvi-uH6aO03-dINcyv9DglMLl3k4JSw">
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={currentPosition}
          zoom={15}
          onLoad={handleMapLoad}
        >
          {mapLoaded && (
            <Marker
              position={currentPosition}
              icon={{
                url: '../Assets/location.png',
                scaledSize: new window.google.maps.Size(70, 90), // Adjust the size as needed
              }}
            />
          )}
        </GoogleMap>
      </LoadScript>
    </div>
  );
}

export default LiveLocation;
