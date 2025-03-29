import { useState, useEffect } from "react";
import { useWeather } from "./hooks/useWeather";
import SearchBar from "./components/SearchBar";
import WeatherCard from "./components/WeatherCard";
import ForecastCard from "./components/ForecastCard";
import { RefreshCw, Info, History, Sun, Moon } from "lucide-react";

function App() {
  const { weather, forecast, fetchWeather, loading, error } = useWeather();
  const [showInfo, setShowInfo] = useState(false);
  const [recentSearches, setRecentSearches] = useState([]);
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem("theme") === "dark";
  });

  useEffect(() => {
    const savedSearches = JSON.parse(localStorage.getItem("recentSearches")) || [];
    setRecentSearches(savedSearches);
  }, []);

  useEffect(() => {
    if (weather) {
      setRecentSearches((prevSearches) => {
        const updatedSearches = [weather.name, ...prevSearches.filter(city => city !== weather.name)].slice(0, 5);
        localStorage.setItem("recentSearches", JSON.stringify(updatedSearches));
        return updatedSearches;
      });
    }
  }, [weather]);

  useEffect(() => {
    localStorage.setItem("theme", darkMode ? "dark" : "light");
    document.documentElement.classList.toggle("dark", darkMode);
  }, [darkMode]);

  return (
    <div className={darkMode ? "bg-gray-900 text-gray-900" : "bg-pink-100 text-gray-900"}>
      <div className="min-h-screen flex flex-col justify-between items-center p-6">
        <div>
          <h1 className={darkMode ? "text-white text-3xl font-bold justify-center items-center flex" : "text-black text-3xl font-bold justify-center items-center flex"}>Weather App</h1>
          <SearchBar onSearch={fetchWeather} />

          <button
            onClick={() => setDarkMode(!darkMode)}
            className="absolute top-4 right-4 bg-gray-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-gray-600 transition-all"
          >
            {darkMode ? <Sun size={20} /> : <Moon size={20} />}
            <span>{darkMode ? "Light Mode" : "Dark Mode"}</span>
          </button>

          {recentSearches.length > 0 && (
            <div className="mt-4 bg-blue-100 p-3 rounded-lg shadow-md text-center">
              <h3 className="text-lg font-semibold flex items-center justify-center gap-2">
                <History size={18} /> Recent Searches
              </h3>
              <div className="flex flex-wrap justify-center mt-2 space-x-2">
                {recentSearches.map((city, index) => (
                  <button
                    key={index}
                    onClick={() => fetchWeather(city)}
                    className="bg-red-200 hover:bg-gray-300 px-3 py-1 rounded-lg text-sm transition-all"
                  >
                    {city}
                  </button>
                ))}
              </div>
            </div>
          )}

          {loading && <p>Loading...</p>}
          {error && <p className="text-red-500">{error}</p>}
        </div>

        {weather && !loading && (
          <div className="flex flex-col items-center">
            <WeatherCard weather={weather} fetchWeather={fetchWeather} />
            {forecast && <ForecastCard forecast={forecast} className={darkMode ? "text-white" : "text-black"} />}
            <div className="mt-4 flex space-x-4">
              <button
                onClick={() => fetchWeather(weather.name)}
                className="bg-blue-500 text-white px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-blue-600 transition-all"
              >
                <RefreshCw size={20} />
                <span>Refresh Weather</span>
              </button>
              <button
                onClick={() => setShowInfo(!showInfo)}
                className="bg-gray-500 text-white px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-gray-600 transition-all"
              >
                <Info size={20} />
                <span>Info</span>
              </button>
            </div>
            {showInfo && (
              <div className="mt-3 bg-white text-gray-900 p-3 rounded-lg shadow-md w-64 text-center text-sm font-semibold">
                🌡️ The weather card changes color based on temperature.
              </div>
            )}
          </div>
        )}
      </div>

      <footer className="mt-5 w-full text-center py-5 bg-gray-800 text-white">
        <p className="text-lg font-semibold">Nikhil Nayan</p>
        <p className="text-sm">📧 nayannikhil25@gmail.com | 📞 +91-8969596898</p>
        <a
          href="https://drive.google.com/file/d/1zAVC0FAWLHYVDEjWrt1meEwyvNWxrEsG/view?usp=sharing"
          target="_blank"
          rel="noopener noreferrer"
          className="mt-2 inline-block bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm transition-all"
        >
          My CV
        </a>
      </footer>
    </div>
  );
}

export default App;
