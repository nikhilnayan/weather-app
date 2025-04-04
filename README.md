# Weather App

## Tech Stack Used
- **React.js** (Frontend framework)
- **Vite** (Development tool for fast build)
- **Tailwind CSS** (For styling)
- **OpenWeatherMap API** (Weather data provider)
- **Lucide-react** (Icons)
- **LocalStorage** (For storing recent searches)

## Setup Instructions

1. **Clone the repository:**
   ```bash
   git clone https://github.com/nikhilnayan/weather-app.git
   cd weather-app
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Create a .env file in the root directory and add your API key:**
   ```
   VITE_WEATHER_API_KEY=your_openweathermap_api_key
   ```

4. **Run the application:**
   ```bash
   npm run dev
   ```

5. **Build for production:**
   ```bash
   npm run build
   ```

## API Integration Details

- **Weather Data Source:** OpenWeatherMap API (https://openweathermap.org/api)
- **Endpoints Used:**
  - `https://api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}` (Current weather)
  - `https://api.openweathermap.org/data/2.5/forecast?q={city name}&appid={API key}` (5-day forecast)

- **API Rate Limits:**
  - Free tier allows **60 requests per minute**.
  - Consider caching responses to optimize API usage.

- **Authentication:**
  - API requires an **API Key**, stored in the `.env` file and accessed using `import.meta.env.VITE_WEATHER_API_KEY` in the code.

## Features
- Search for current weather by city name.
- Display temperature, humidity, wind speed, and weather icons.
- Show a 5-day weather forecast.
- Dark/Light theme toggle.
- Recent search history stored in local storage.
- Refresh button to update weather data.
