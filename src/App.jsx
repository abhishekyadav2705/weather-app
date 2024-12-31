import React, { useState, useEffect } from "react";
import axios from "axios";
import styled, { ThemeProvider, createGlobalStyle } from "styled-components";
import { FaSpinner, FaSun, FaMoon } from "react-icons/fa";
import Weather from "./components/Weather";
import Forecast from "./components/Forecast";
import Marquee from "./components/Marquee";

// Import Google Font
const GlobalStyle = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@300;500&display=swap');

  body {
    font-family: 'Montserrat', sans-serif;
  }
`;

const lightTheme = {
  background: "#f0f2f5",
  color: "#333",
};

const darkTheme = {
  background: "#333",
  color: "#f0f2f5",
};

const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: 20px;
  background: ${(props) => props.theme.background};
  color: ${(props) => props.theme.color};
  min-height: 100vh;
  transition: background 0.5s ease-in-out, color 0.5s ease-in-out;
  position: relative;

  @media (max-width: 768px) {
    padding: 10px;
  }

  h5 {
    font-size: 1rem;
    margin-bottom: 2rem;
    color: #555;
    padding: 10px 20px;
    border-radius: 10px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    font-weight: 300;
  }
`;

const Form = styled.form`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 20px;
  flex-wrap: wrap;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const Input = styled.input`
  padding: 10px;
  margin-right: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 1rem;

  @media (max-width: 768px) {
    margin-right: 0;
    margin-bottom: 10px;
    width: 100%;
  }
`;

const Button = styled.button`
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  background-color: #007bff;
  color: #fff;
  font-size: 1rem;
  cursor: pointer;

  &:hover {
    background-color: #0056b3;
  }

  @media (max-width: 768px) {
    width: 100%;
  }
`;

const ToggleButton = styled.button`
  position: absolute;
  top: 20px;
  right: 20px;
  background: none;
  border: none;
  cursor: pointer;
  font-size: 1.5rem;

  @media (max-width: 768px) {
    top: 10px;
    right: 10px;
  }
`;

const App = () => {
  const [city, setCity] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  const [forecastData, setForecastData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [theme, setTheme] = useState(lightTheme);

  const API_KEY = "bb815ae645196495babc2bb5b0402bc0"; // Your OpenWeatherMap API key

  useEffect(() => {
    getLocationWeather();
  }, []);

  const getLocationWeather = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          fetchWeatherByCoordinates(latitude, longitude);
        },
        (error) => {
          console.error("Error fetching location:", error);
          setError("Unable to fetch location. Please enter city manually.");
        }
      );
    } else {
      setError("Geolocation is not supported by this browser.");
    }
  };

  const fetchWeatherByCoordinates = async (lat, lon) => {
    setLoading(true);
    setError("");
    try {
      const weatherResponse = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`
      );
      setWeatherData(weatherResponse.data);

      const forecastResponse = await axios.get(
        `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`
      );
      setForecastData(
        forecastResponse.data.list.filter((reading) =>
          reading.dt_txt.includes("12:00:00")
        )
      );

      setLoading(false);
    } catch (error) {
      console.error("Error fetching weather data:", error);
      setError("Unable to fetch weather data. Please try again.");
      setLoading(false);
    }
  };

  const fetchWeather = async () => {
    setLoading(true);
    setError("");
    try {
      const weatherResponse = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`
      );
      setWeatherData(weatherResponse.data);

      const forecastResponse = await axios.get(
        `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${API_KEY}`
      );
      setForecastData(
        forecastResponse.data.list.filter((reading) =>
          reading.dt_txt.includes("12:00:00")
        )
      );

      setLoading(false);
    } catch (error) {
      console.error("Error fetching weather data:", error);
      setError("City not found. Please try again.");
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    setCity(e.target.value);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    fetchWeather();
  };

  const toggleTheme = () => {
    setTheme(theme === lightTheme ? darkTheme : lightTheme);
  };

  const getWeatherSuggestion = (weather) => {
    if (!weather) return "Loading... 🌦️";

    const main = weather.weather[0].main.toLowerCase();
    switch (main) {
      case "clear":
        return "It's sunny outside! Don't forget your sunglasses 😎";
      case "clouds":
        return "It's a bit cloudy today. Enjoy the cool weather 🌥️";
      case "rain":
        return "It's raining! Don't forget your umbrella ☔";
      case "snow":
        return "Snowy weather! Stay warm and safe ❄️";
      case "thunderstorm":
        return "Thunderstorm alert! Stay indoors and be safe ⛈️";
      case "drizzle":
        return "Light rain outside, take a light jacket 🌦️";
      case "mist":
        return "It's misty, drive safely 🚗";
      default:
        return "Have a great day! 🌈";
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <AppContainer>
        {weatherData && (
          <marquee behavior="scroll" direction="left" scrollamount="10">
            {getWeatherSuggestion(weatherData)}
          </marquee>
        )}
        <ToggleButton onClick={toggleTheme}>
          {theme === lightTheme ? <FaMoon /> : <FaSun />}
        </ToggleButton>
        <h1> Weather App ☃️❄️</h1>
        <h5>
          Allow us to access your location, and we’ll instantly fetch the latest
          weather updates for your city 🌇. No need to type a thing—just sit
          back, relax 🛋️, and enjoy the accurate forecast for your current
          location 🌤️.
        </h5>

        <Form onSubmit={handleFormSubmit}>
          <Input
            type="text"
            value={city}
            onChange={handleInputChange}
            placeholder="Enter city name"
          />
          <Button type="submit">Get Weather</Button>
        </Form>
        {error && <ErrorMessage>{error}</ErrorMessage>}
        <Weather weatherData={weatherData} />
        {/* <Forecast forecastData={forecastData} /> */}
      </AppContainer>
    </ThemeProvider>
  );
};
export default App;
