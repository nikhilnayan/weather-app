import { motion } from "framer-motion";
import { RefreshCw } from "lucide-react";

const WeatherCard = ({ weather, fetchWeather }) => {
  if (!weather) return null; // Don't render if no data

  // Determine the background color based on temperature
  const temp = weather.main.temp;
  let bgColor = "from-blue-500 to-indigo-700"; // Default cold (blue)

  if (temp >= 15 && temp < 25) {
    bgColor = "from-orange-300 to-orange-500"; // Slight Orange
  } else if (temp >= 25 && temp < 35) {
    bgColor = "from-orange-500 to-orange-700"; // Orange
  } else if (temp >= 35) {
    bgColor = "from-red-600 to-red-800"; // Hot (Red)
  }

  return (
    <motion.div
      className={`mt-10 p-8 bg-gradient-to-br ${bgColor} shadow-lg rounded-2xl text-white text-center w-80 mx-auto`}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* City Name */}
      <h2 className="text-3xl font-bold">{weather.name}</h2>

      {/* Weather Icon */}
      <img
        src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
        alt="Weather icon"
        className="w-24 mx-auto"
      />

      {/* Temperature */}
      <p className="text-4xl font-semibold">{weather.main.temp}°C</p>

      {/* Description */}
      <p className="capitalize text-lg">{weather.weather[0].description}</p>

      {/* Additional Info */}
      <div className="mt-4 flex justify-around">
        <div className="text-center">
          <p className="text-sm">Humidity</p>
          <p className="text-xl font-semibold">{weather.main.humidity}%</p>
        </div>
        <div className="text-center">
          <p className="text-sm">Wind</p>
          <p className="text-xl font-semibold">{weather.wind.speed} km/h</p>
        </div>
      </div>
    </motion.div>
  );
};

export default WeatherCard;
