import React, { useState, useEffect } from 'react';
import './App.css';

const sounds = [
  { key: 'Q', name: 'Heater 1', url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3' },
  { key: 'W', name: 'Heater 2', url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-2.mp3' },
  { key: 'E', name: 'Heater 3', url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-3.mp3' },
  { key: 'A', name: 'Heater 4', url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-4_1.mp3' },
  { key: 'S', name: 'Clap', url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-6.mp3' },
  { key: 'D', name: 'Open-HH', url: 'https://s3.amazonaws.com/freecodecamp/drums/Dsc_Oh.mp3' },
  { key: 'Z', name: "Kick-n'-Hat", url: 'https://s3.amazonaws.com/freecodecamp/drums/Kick_n_Hat.mp3' },
  { key: 'X', name: 'Kick', url: 'https://s3.amazonaws.com/freecodecamp/drums/RP4_KICK_1.mp3' },
  { key: 'C', name: 'Closed-HH', url: 'https://s3.amazonaws.com/freecodecamp/drums/Cev_H2.mp3' }
];

function App() {
  const [display, setDisplay] = useState('');

  const playSound = (key, name) => {
    const audio = document.getElementById(key);
    audio.currentTime = 0; // Reset audio
    audio.play();
    setDisplay(name);
  };

  const handleKeyPress = (event) => {
    const sound = sounds.find((s) => s.key === event.key.toUpperCase());
    if (sound) {
      playSound(sound.key, sound.name);
    }
  };

  useEffect(() => {
    document.addEventListener('keydown', handleKeyPress);
    return () => {
      document.removeEventListener('keydown', handleKeyPress);
    };
  }, []);

  return (
    <div id="drum-machine">
      <div id="display">{display || 'Press or Click a Pad'}</div>
      <div className="pad-container">
        {sounds.map((sound) => (
          <DrumPad
            key={sound.key}
            sound={sound}
            playSound={playSound}
          />
        ))}
      </div>
    </div>
  );
}

function DrumPad({ sound, playSound }) {
  const handleClick = () => {
    playSound(sound.key, sound.name);
  };

  return (
    <div
      id={sound.name}
      className="drum-pad"
      onClick={handleClick}
    >
      {sound.key}
      <audio
        className="clip"
        id={sound.key}
        src={sound.url}
      ></audio>
    </div>
  );
}

export default App;
