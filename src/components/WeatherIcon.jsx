import { useState, useEffect } from "react";
import axios from "axios";
const WeatherIcon = () => {
  const [latitude, setLatitude] = useState(0);
  const [longitutde, setLongitude] = useState(0);

  const getWeather = async (lat, lon) => {
    try {
      const data = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${
          import.meta.env.VITE_WEATHER_KEY
        }`
      );
      console.log({ data });
    } catch (e) {
      console.error(e);
    }
  };
  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      console.log(position);
      getWeather(position.coords.latitude, position.coords.longitude);
    });
  }, []);
  return <div>WeatherIcon</div>;
};

export default WeatherIcon;
