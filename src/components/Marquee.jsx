// Marquee.js
import React from "react";
import styled, { keyframes } from "styled-components";

const scroll = keyframes`
  0% { transform: translateX(100%); }
  100% { transform: translateX(-100%); }
`;

const MarqueeContainer = styled.div`
  overflow: hidden;
  white-space: nowrap;
  box-sizing: border-box;
  width: 100%;
  background: #007bff;
  color: white;
  padding: 10px 0;
  margin-top: 20px;
`;

const MarqueeText = styled.div`
  display: inline-block;
  padding-left: 100%;
  animation: ${scroll} 15s linear infinite;
  font-size: 1.2rem;
`;

const suggestions = {
  Clear:
    "It’s sunny out there! 😎 Don’t forget your sunglasses 🕶️ and sunscreen! 🌞",
  Rain: "Looks like rain! 🌧️ Don’t forget to take an umbrella ☔ and wear waterproof shoes! 🥾",
  Snow: "Snow is falling! ❄️ Wear warm clothes 🧣🧤 and be careful on the roads! 🚗",
  Clouds: "It’s a bit cloudy ☁️ You might want to take a light jacket! 🧥",
  Thunderstorm:
    "Thunderstorms ahead! ⛈️ Stay indoors if possible and be safe! 🏠",
  Drizzle:
    "Light rain outside 🌦️ A raincoat or umbrella should do the trick! ☔",
  Mist: "It’s misty 🌫️ Drive carefully and keep your lights on! 🚗",
  Smoke: "The air is smoky 🌫️ Wear a mask if you’re going outside! 😷",
  Haze: "Hazy weather 🌫️ Consider wearing a mask and avoiding outdoor activities! 😷",
  Dust: "Dusty conditions 🌪️ Wear a mask and protect your eyes! 👓",
  Fog: "Dense fog 🌁 Drive with caution and use fog lights! 🚗",
  Sand: "Sandstorm approaching! 🌪️ Stay indoors if possible and protect your eyes! 👓",
  Ash: "Volcanic ash in the air 🌋 Avoid going outside and keep windows closed! 🚪",
  Squall: "Sudden squalls 🌬️ Hold onto your hats and stay indoors! 🏠",
  Tornado: "Tornado warning! 🌪️ Seek shelter immediately! 🏠",
};

const Marquee = ({ weather }) => {
  const suggestion = suggestions[weather] || "Have a great day! 😊";
  return (
    <MarqueeContainer>
      <MarqueeText>{suggestion}</MarqueeText>
    </MarqueeContainer>
  );
};

export default Marquee;
