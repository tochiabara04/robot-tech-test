import React, { useState } from 'react';
import Robot from '../Robot';
import './grid.css';

const Grid = () => {
  const [position, setPosition] = useState(20);
  const [coordinates, setCoordinates] = useState<'N' | 'E' | 'S' | 'W'>('E');
  const [commands, setCommands] = useState('');
  const [isExecuting, setIsExecuting] = useState(false);

  const turnRobot = (turnDirection: 'R' | 'L') => {
    const directions: Array<'N' | 'E' | 'S' | 'W'> = ['N', 'E', 'S', 'W'];
    let currentDirection: 'N' | 'E' | 'S' | 'W' = coordinates;
  
    if (turnDirection === 'R') {
      currentDirection = directions[(directions.indexOf(currentDirection) + 1) % 4];
    } else if (turnDirection === 'L') {
      currentDirection = directions[(directions.indexOf(currentDirection) + 3) % 4];
    }

    setCoordinates(currentDirection);
  };

  const moveRobot = () => {
    setPosition((prevPosition) => {
      let newPosition = prevPosition;

      switch (coordinates) {
        case 'N':
          if (newPosition >= 5) newPosition -= 5;
          break;
        case 'E':
          if ((newPosition + 1) % 5 !== 0) newPosition += 1;
          break;
        case 'S':
          if (newPosition < 20) newPosition += 5;
          break;
        case 'W':
          if (newPosition % 5 !== 0) newPosition -= 1;
          break;
        default:
          break;
      }

      return newPosition;
    });
  };

  const executeCommandSequence = async () => {
    if (isExecuting) return;

    setIsExecuting(true);

    const commandsArray = commands.toUpperCase().split('');

    await commandsArray.reduce(async (promise, command) => {
      await promise;

      if (command === 'R' || command === 'L') {
        turnRobot(command as 'R' | 'L');
      } else if (command === 'F') {
        moveRobot();
      }

      return new Promise((resolve) => setTimeout(resolve, 1000));
    }, Promise.resolve());

    setIsExecuting(false);
  };

  return (
    <div>
      <div className="container">
        {[...Array(25)].map((_, index) => (
          <div key={index} data-testid={`box-${index}`} className="box">
            {index === position && <Robot direction={coordinates} />}
          </div>
        ))}
      </div>

      <div className="controls">
        <input
          type="text"
          placeholder="Enter commands (e.g., RF)"
          value={commands}
          onChange={(e) => setCommands(e.target.value)}
          disabled={isExecuting}
        />
        <button className="button" onClick={executeCommandSequence} disabled={isExecuting}>
          Execute
        </button>
      </div>
    </div>
  );
};

export default Grid;
