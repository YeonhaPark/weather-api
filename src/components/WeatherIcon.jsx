import { useState, useEffect } from "react";
import axios from "axios";
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

  if (!weatherData) {
    return (
      <div className="w-36 textgit credential-osxkeychain erase-xs">
        Loading...
      </div>
    );
  }
  return (
    <div className="text-xs">
      {weatherData && (
        <div className="flex items-center">
          <img
            className="w-12"
            src={`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`}
          />
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
