import React from 'react';
import '../Robot/robot.css';

interface RobotProps {
  direction: 'N' | 'E' | 'S' | 'W';
}

const Robot = ({ direction }: RobotProps) => {
  const getRotation = (direction: 'N' | 'E' | 'S' | 'W'): number => {
    if (direction === 'N') {
      return 0;
    } else if (direction === 'E') {
      return 90;
    } else if (direction === 'S') {
      return 180;
    } else if (direction === 'W') {
      return 270;
    }
    return 0;
  };

  return (
    <span
      className="robot"
      role="img"
      aria-label="robot"
      style={{ transform: `rotate(${getRotation(direction)}deg)` }}
    >
      🤖
    </span>
  );
};

export default Robot;
