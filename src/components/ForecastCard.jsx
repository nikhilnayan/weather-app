import { motion } from "framer-motion";

const ForecastCard = ({ forecast }) => {
  if (!forecast || forecast.length === 0) return null; // only render if forecast data is available

  return (
    <div className="mt-6 w-full max-w-2xl">
      <h2 className="text-xl font-bold text-center ">5-Day Forecast</h2>
      <div className="flex justify-between gap-4 overflow-hidden mt-4">
        {forecast.map((day, index) => (
          <motion.div
            key={index}
            className="p-4 bg-gradient-to-br from-gray-200 to-gray-400 shadow-lg rounded-lg text-center min-w-[120px]"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <p className="font-semibold">{new Date(day.dt_txt).toLocaleDateString("en-US", { weekday: "short" })}</p>
            <img src={`https://openweathermap.org/img/wn/${day.weather[0].icon}.png`} alt="Weather icon" className="mx-auto w-12" />
            <p className="text-lg font-bold">{Math.round(day.main.temp)}°C</p>
            <p className="capitalize text-sm">{day.weather[0].description}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default ForecastCard;
