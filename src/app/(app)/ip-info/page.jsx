"use client";
import { useEffect, useState } from 'react';

export default function GeolocationComponent() {
  const [ip, setIp] = useState(null);
  const [location, setLocation] = useState(null);

  useEffect(() => {
    // Fetch the public IP address
    const fetchIp = async () => {
      try {
        const response = await fetch('https://api.ipify.org?format=json');
        const data = await response.json();
        setIp(data.ip);
      } catch (error) {
        console.error("Error fetching IP address:", error);
      }
    };

    fetchIp();

    // Fetch the geolocation data
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setLocation({ latitude, longitude });
        },
        (error) => {
          console.error("Error retrieving location:", error);
        }
      );
    } else {
      console.log("Geolocation is not supported by this browser.");
    }
  }, []);

  return (
    <div>
      <h1>Geolocation and IP Address</h1>
      <div>
        <strong>IP Address:</strong> {ip || 'Loading...'}
      </div>
      <div>
        <strong>Latitude:</strong> {location?.latitude || 'Loading...'}<br />
        <strong>Longitude:</strong> {location?.longitude || 'Loading...'}
      </div>
    </div>
  );
}
