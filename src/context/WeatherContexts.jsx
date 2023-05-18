import { createContext, useState, useEffect } from "react";
import cities from "../CitiesData/cities.json";
import axios from 'axios';

const WeatherContext = createContext();

export const WeatherProvider = ({children}) => {
  const [weather, setWeather] = useState([]);
  const [city, setCity] = useState("");
  const values = { weather, setWeather, city, setCity, cities };

  useEffect(() => {
    const selectedCity = cities.find((item) => item.name === city);
    if (selectedCity) {
      axios
        .get(
          `https://api.openweathermap.org/data/2.5/forecast?lat=${selectedCity.latitude}&lon=${selectedCity.longitude}&appid=ab8546906d9631afc09326b55a9b5d32`
        )
        .then((response) => {
          const weatherData = response.data.list;
          setWeather(weatherData);
        })
        .catch((error) => {
          console.error("Veride hata oluştu:", error);
        });
    }
  }, [city]);

  return (
    <WeatherContext.Provider value={values}>
      {children}
    </WeatherContext.Provider>
  );
}

export default WeatherContext;