import { useState } from "react";
import axios from "axios";

const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;

export const useWeather = () => {
    const [weather, setWeather] = useState(null);
    const [forecast, setForecast] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchWeather = async (city) => {
        setLoading(true);
        setError(null);
        setWeather(null);
        setForecast(null); // Clear previous data

        try {
            console.log("Fetching weather for:", city);


            const weatherResponse = await axios.get(
                `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`  // Fetch Current Weather
            );


            const forecastResponse = await axios.get(
                `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}&units=metric`  // Fetch 5-Day Forecast
            );

            console.log("Weather Response:", weatherResponse.data);
            console.log("Forecast Response:", forecastResponse.data);

            setWeather(weatherResponse.data);


            const dailyForecast = forecastResponse.data.list.filter((_, index) => index % 8 === 0);  // Extract one forecast per day (~12:00 PM) (the API returns 8 forecasts per day)
            setForecast(dailyForecast);
        } catch (err) {
            console.error("API Error:", err.response?.data || err);
            setError("City not found or API error");
        } finally {
            setLoading(false);
        }
    };

    return { weather, forecast, fetchWeather, loading, error };
};
