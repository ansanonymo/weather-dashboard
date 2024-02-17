import { useContext, useEffect, useState } from "react";
import { LocationContext } from "../context";

const useWeather = () => {
  const [weatherData, setWeatherData] = useState({
    location: "",
    climate: "",
    temperature: "",
    maxTemperature: "",
    minTemperature: "",
    humidity: "",
    cloudPercentage: "",
    wind: "",
    time: "",
    longitude: "",
    latitude: "",
  });

  const [loading, setLoading] = useState({
    state: false,
    message: "",
  });

  const [error, setError] = useState(null);

  const { selectedLocation } = useContext(LocationContext);

  useEffect(() => {
    let ignore = false;
    const fetchWeatherData = async (latitude, longitude) => {
      try {
        setLoading((loading) => {
          return {
            ...loading,
            state: true,
            message: "Fetching Weather Data",
          };
        });

        // TODO : Make the fetch call
        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${
            import.meta.env.VITE_WEATHER_API_KEY
          }&units=metric`
        );

        if (!response.ok) {
          const errorMessage = `Fetching weather data failed : ${response.status}`;
          throw new Error(errorMessage);
        }

        const data = await response.json();

        setWeatherData((weatherData) => {
          const updatedWeatherData = {
            ...weatherData,
            location: data?.name,
            climate: data?.weather[0]?.main,
            temperature: data?.main?.temp,
            maxTemperature: data?.main?.temp_max,
            minTemperature: data?.main?.temp_min,
            humidity: data?.main?.humidity,
            cloudPercentage: data?.clouds?.all,
            wind: data?.wind?.speed,
            time: data?.dt,
            longitude,
            latitude,
          };

          return updatedWeatherData;
        });
      } catch (e) {
        setError(e);
      } finally {
        setLoading((loading) => {
          return {
            ...loading,
            state: false,
            message: "",
          };
        });
      }
    };

    setLoading((loading) => {
      return {
        ...loading,
        state: true,
        message: "Finding location...",
      };
    });

    if (!ignore) {
      if (selectedLocation.latitude && selectedLocation.longitude) {
        fetchWeatherData(selectedLocation.latitude, selectedLocation.longitude);
      } else {
        navigator.geolocation.getCurrentPosition(function (possition) {
          fetchWeatherData(
            possition.coords.latitude,
            possition.coords.longitude
          );
        });
      }
    }

    return () => {
      ignore = true;
    };
  }, [selectedLocation.latitude, selectedLocation.longitude]);

  return {
    weatherData,
    error,
    loading,
  };
};

export default useWeather;
