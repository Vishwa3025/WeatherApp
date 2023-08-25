import React, { useState, useEffect } from 'react'


export const Location = () => {

  const [location, setLocation] = useState({
    loaded: "false",
    coordinates: { lat: "", lon: "" }
  });

  const onSuccess = () => {
    setLocation({
      loaded: "true",
      coordinates: { lat: location.coords.lat, lon: location.coords.lon }
    });
  }

  const onError = (error) => {
    setLocation({
      loaded: "true",
      error,
    });
  }

  useEffect(() => {
    if (!("geolocation" in navigator)) {
      onError({
        code: 1,
        message: "Geolocation is not supported by your browser."
      });
    }

    navigator.geolocation.getCurrentPosition(onSuccess, onError);

  }, [])

  return (
    <div>Location</div>
  )
}
