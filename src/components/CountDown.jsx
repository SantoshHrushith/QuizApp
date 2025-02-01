import React, { useState, useEffect } from 'react';
import useSound from 'use-sound'; // Import the useSound hook
import tickSound from '../sound/beep-sound.mp3'; // Import the tick sound
import goSound from '../sound/go.mp3'; // Import the go sound
import './CountDown.css'; // Import CSS for the countdown

const Countdown = ({ onComplete }) => {
  const [count, setCount] = useState(3);
  const [playTickSound] = useSound(tickSound);
  const [playGoSound] = useSound(goSound);

  useEffect(() => {
    if (count > 0) {
      playTickSound(); // Play tick sound for each countdown tick
      const timer = setTimeout(() => setCount(count - 1), 1000);
      return () => clearTimeout(timer);
    } else if (count === 0) {
      playGoSound(); // Play go sound when countdown reaches "Go!"
      const timer = setTimeout(() => {
        onComplete();
      }, 500); // Delay the onComplete call to allow "Go!" to be displayed
      return () => clearTimeout(timer);
    }
  }, [count, onComplete, playTickSound, playGoSound]);

  return (
    <div className="countdown">
      <h1>{count > 0 ? count : 'Go!'}</h1>
    </div>
  );
};

export default Countdown;