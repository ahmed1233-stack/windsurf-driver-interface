import React from 'react';

const RocketLogo = ({ width = "300", height = "200" }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 300 200"
      width={width}
      height={height}
      className="rocket-logo"
    >
      {/* Background Circle */}
      <circle cx="150" cy="100" r="80" fill="#E3F2FD" />
      
      {/* Rocket Body */}
      <g transform="translate(0, -20)">
        {/* Main Body */}
        <path
          d="M150 140 L180 140 Q190 140 190 130 L190 90 Q190 80 180 80 L120 80 Q110 80 110 90 L110 130 Q110 140 120 140 L150 140"
          fill="#2196F3"
          stroke="#1976D2"
          strokeWidth="2"
        />
        
        {/* Window */}
        <circle cx="150" cy="110" r="15" fill="#90CAF9" stroke="#1976D2" strokeWidth="2" />
        <circle cx="150" cy="110" r="10" fill="#E3F2FD" />
        
        {/* Wings */}
        <path
          d="M110 120 L90 140 L90 100 Z"
          fill="#1976D2"
          stroke="#0D47A1"
          strokeWidth="2"
        />
        <path
          d="M190 120 L210 140 L210 100 Z"
          fill="#1976D2"
          stroke="#0D47A1"
          strokeWidth="2"
        />
        
        {/* Rocket Bottom */}
        <path
          d="M130 140 L170 140 L160 150 L140 150 Z"
          fill="#1565C0"
          stroke="#0D47A1"
          strokeWidth="2"
        />
        
        {/* Flame */}
        <g className="flame">
          <path
            d="M145 150 Q150 170 155 150"
            fill="none"
            stroke="#FF9800"
            strokeWidth="4"
          />
          <path
            d="M140 150 Q150 180 160 150"
            fill="none"
            stroke="#FFA726"
            strokeWidth="6"
          />
          <path
            d="M135 150 Q150 190 165 150"
            fill="none"
            stroke="#FF5722"
            strokeWidth="8"
          />
        </g>
      </g>
      
      {/* Stars */}
      <circle cx="100" cy="60" r="2" fill="#1976D2" />
      <circle cx="200" cy="80" r="2" fill="#1976D2" />
      <circle cx="180" cy="40" r="2" fill="#1976D2" />
      <circle cx="120" cy="50" r="2" fill="#1976D2" />
      
      <style>
        {`
          .flame {
            animation: flicker 0.5s infinite alternate;
          }
          
          @keyframes flicker {
            from {
              transform: scaleY(0.9);
              opacity: 0.9;
            }
            to {
              transform: scaleY(1.1);
              opacity: 1;
            }
          }
        `}
      </style>
    </svg>
  );
};

export default RocketLogo;
