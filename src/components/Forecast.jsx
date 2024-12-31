import React from "react";
import styled, { keyframes } from "styled-components";
import {
  WiDaySunny,
  WiCloud,
  WiRain,
  WiSnow,
  WiThunderstorm,
} from "react-icons/wi";

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const ForecastContainer = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  margin-top: 20px;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
  }
`;

const Day = styled.div`
  background: rgba(255, 255, 255, 0.8);
  padding: 10px;
  border-radius: 10px;
  margin: 10px;
  text-align: center;
  width: 120px;
  animation: ${fadeIn} 1s ease-in-out;

  @media (max-width: 768px) {
    width: 90%;
    margin: 10px 0;
  }
`;

const DateText = styled.p`
  font-size: 1rem;
  margin: 5px 0;
  color: #333;
`;

const Temp = styled.p`
  font-size: 1.2rem;
  margin: 5px 0;
  color: #555;
`;

const Condition = styled.p`
  font-size: 1rem;
  margin: 5px 0;
  color: #777;
`;

const WeatherIcon = ({ condition }) => {
  switch (condition) {
    case "clear":
      return <WiDaySunny size={32} color="#f39c12" />;
    case "clouds":
      return <WiCloud size={32} color="#95a5a6" />;
    case "rain":
      return <WiRain size={32} color="#3498db" />;
    case "snow":
      return <WiSnow size={32} color="#ecf0f1" />;
    case "thunderstorm":
      return <WiThunderstorm size={32} color="#e74c3c" />;
    default:
      return <WiCloud size={32} color="#95a5a6" />;
  }
};

const Forecast = ({ forecastData }) => {
  if (!forecastData) return null;

  return (
    <ForecastContainer>
      {forecastData.map((day, index) => {
        const date = new window.Date(day.dt_txt).toLocaleDateString("en-US", {
          weekday: "short",
          month: "short",
          day: "numeric",
        });
        const condition = day.weather[0].main.toLowerCase();

        return (
          <Day key={index}>
            <DateText>{date}</DateText>
            <WeatherIcon condition={condition} />
            <Temp>{day.main.temp}°C</Temp>
            <Condition>{day.weather[0].description}</Condition>
          </Day>
        );
      })}
    </ForecastContainer>
  );
};

export default Forecast;
