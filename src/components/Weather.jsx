import React from "react";
import styled, { keyframes } from "styled-components";
import {
  WiDaySunny,
  WiCloud,
  WiRain,
  WiSnow,
  WiThunderstorm,
  WiWindy,
  WiBarometer,
} from "react-icons/wi";

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background: rgba(255, 255, 255, 0.8);
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  width: 300px;
  margin: 20px auto;
  animation: ${fadeIn} 1s ease-in-out;

  @media (max-width: 768px) {
    width: 90%;
  }
`;

const City = styled.h2`
  font-size: 2.5rem;
  margin: 10px 0;
  color: #333;

  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

const Temp = styled.p`
  font-size: 2rem;
  margin: 5px 0;
  color: #555;

  @media (max-width: 768px) {
    font-size: 1.5rem;
  }
`;

const Condition = styled.p`
  font-size: 1.2rem;
  margin: 5px 0;
  color: #777;

  @media (max-width: 768px) {
    font-size: 1rem;
  }
`;

const Details = styled.div`
  display: flex;
  justify-content: space-around;
  width: 100%;
  margin-top: 10px;
`;

const Detail = styled.div`
  text-align: center;
`;

const WeatherIcon = ({ condition }) => {
  switch (condition) {
    case "clear":
      return <WiDaySunny size={64} color="#f39c12" />;
    case "clouds":
      return <WiCloud size={64} color="#95a5a6" />;
    case "rain":
      return <WiRain size={64} color="#3498db" />;
    case "snow":
      return <WiSnow size={64} color="#ecf0f1" />;
    case "thunderstorm":
      return <WiThunderstorm size={64} color="#e74c3c" />;
    default:
      return <WiCloud size={64} color="#95a5a6" />;
  }
};

const Weather = ({ weatherData }) => {
  if (!weatherData) return null;

  const { name, main, weather, wind } = weatherData;
  const condition = weather[0].main.toLowerCase();

  return (
    <Container>
      <City>{name}</City>
      <WeatherIcon condition={condition} />
      <Temp>{main.temp}°C</Temp>
      <Condition>{weather[0].description}</Condition>
      <Details>
        <Detail>
          <WiWindy size={24} />
          <p>{wind.speed} m/s</p>
        </Detail>
        <Detail>
          <WiBarometer size={24} />
          <p>{main.pressure} hPa</p>
        </Detail>
      </Details>
    </Container>
  );
};

export default Weather;
