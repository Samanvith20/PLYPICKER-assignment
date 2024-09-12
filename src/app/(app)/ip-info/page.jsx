"use client";
import { useEffect, useState } from 'react';

export default function GeolocationComponent() {
  const [location, setLocation] = useState(null);
  console.log(location);
  
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchLocation = async () => {
      try {
       
        const response = await fetch('/api/get-location');
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
        <strong>IP Address:</strong> {location?.ip}<br />
       
      </div>
    </div>
  );
}
