"use client";
import { useEffect, useState } from 'react';

export default function GeolocationComponent() {
  const [location, setLocation] = useState(null);
  console.log(location);
  
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchLocation = async () => {
      try {
       
        const response = await fetch('https://geolocation-db.com/json/e18b48c0-6cef-11ef-be25-fdc8f1201945');
        const data = await response.json();
         
         
        if (data) {
          setLocation(data);
        } else {
          setError("Failed to fetch location data.");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        setError("Failed to fetch data.");
      }
    };

    fetchLocation();
  }, []);

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <h1>Geolocation and IP Address</h1>
      <div>
        <strong>IP Address:</strong> {location?.IPv4 || 'Loading...'}<br />
        <strong>City:</strong> {location?.city || 'Loading...'}<br />
        <strong>State:</strong> {location?.state || 'Loading...'}<br />
        <strong>Country:</strong> {location?.country_name || 'Loading...'}<br />
        <strong>Latitude:</strong> {location?.latitude || 'Loading...'}<br />
        <strong>Longitude:</strong> {location?.longitude || 'Loading...'}<br />
      </div>
    </div>
  );
}
