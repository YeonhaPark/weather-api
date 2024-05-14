import { useState, useEffect } from "react";
import axios from "axios";
import {
  WiCloud,
  WiCloudy,
  WiDayCloudy,
  WiFog,
  WiRain,
  WiSnowflakeCold,
  WiStormShowers,
} from "react-icons/wi";
import { WiDaySunny } from "react-icons/wi";
const WeatherIcon = () => {
  const [latitude, setLatitude] = useState(0);
  const [longitutde, setLongitude] = useState(0);
  const [weatherData, setWeatherData] = useState();

  const getWeather = async (lat, lon) => {
    try {
      const { data } = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?units=metric&lat=${lat}&lon=${lon}&appid=${
          import.meta.env.VITE_WEATHER_KEY
        }`
      );
      setWeatherData(data);
    } catch (e) {
      console.error(e);
    }
  };

  const renderWeatherIcon = (icon) => {
    switch (icon) {
      case "01":
        return <WiDaySunny size={32} />;
      case "02":
        return <WiDayCloudy size={32} />;
      case "03":
      case "04":
        return <WiCloudy size={32} />;
      case "09":
      case "10":
        return <WiRain size={32} />;
      case "11":
        return <WiStormShowers size={32} />;
      case "13":
        return <WiSnowflakeCold size={32} />;
      case "50":
        return <WiFog size={32} />;
    }
  };
  useEffect(() => {
    getWeather(latitude, longitutde);
  }, [latitude, longitutde]);
  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      setLatitude(position.coords.latitude);
      setLongitude(position.coords.longitude);
    });
  }, []);

  if (!weatherData) {
    return <div className="w-[136px] text-sm">Loading...</div>;
  }
  return (
    <div className="text-xs">
      {weatherData && (
        <div className="flex items-center gap-2">
          {renderWeatherIcon(weatherData.weather[0].icon.substring(0, 2))}
          <div className="w-24">
            <div>{weatherData.name}</div>
            <div>{weatherData.main.temp.toFixed(1)}&#176;C</div>
          </div>
        </div>
      )}
    </div>
  );
};

export default WeatherIcon;
