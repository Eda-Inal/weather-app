import React, { useContext } from "react";
import WeatherContext from "../context/WeatherContexts";
import  "../App.css"

function Weather() {
  const { weather, city, setCity, cities } = useContext(WeatherContext);

  const handleCityChange = (event) => {
    const selectedCity = event.target.value;
    setCity(selectedCity);
  };

  const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

  const dailyWeather = weather.reduce((filteredData, item) => {
    const date = new Date(item.dt_txt.split(" ")[0]);
    const dayOfWeek = daysOfWeek[date.getDay()];

    const existingData = filteredData.find((data) => data.date === dayOfWeek);
    
    if (!existingData) {
      filteredData.push({
        date: dayOfWeek,
        maxTemp: item.main.temp_max,
        minTemp: item.main.temp_min,
        description: item.weather[0].description,
        icon: item.weather[0].icon,
      });
    } else {
      if (item.main.temp_max > existingData.maxTemp) {
        existingData.maxTemp = item.main.temp_max;
      }
      if (item.main.temp_min < existingData.minTemp) {
        existingData.minTemp = item.main.temp_min;
      }
    }

    return filteredData;
  }, []);

  return (
    <div>
      <select value={city} onChange={handleCityChange} className="x">
        <option value="">Şehir Seçin</option>
        {cities.map((city) => (
          <option key={city.id} value={city.name}>
            {city.name}
          </option>
        ))}
      </select>

      {dailyWeather.length > 0 ? (
        <div className="weather-cards">
          {dailyWeather.map((item, index) => (
            <div key={index} className="weather-card">
              <img
                src={`https://openweathermap.org/img/wn/${item.icon}.png`}
                alt="Weather Icon"
              />
              <h5>{item.date}</h5>
              <p> {Math.round(item.maxTemp - 273.15)} °C</p>
              <p> {Math.round(item.minTemp - 273.15)} °C</p>
              <p> {item.description}</p>
            </div>
          ))}
        </div>
      ) : (
        <p>No weather data available.</p>
      )}
    </div>
  );
}

export default Weather;