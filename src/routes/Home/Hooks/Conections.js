import axios from "axios";

const fetchWeather = async (latitude, longitude, setWeather) => {
  const apiKey = import.meta.env.VITE_WEATHER_API_KEY;
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${apiKey}`;
  try {
    const response = await axios.get(url);
    setWeather(response.data);
  } catch (error) {
    console.error("Error fetching weather data: ", error);
  }
};

export default fetchWeather;
