import React from 'react';
import { useEffect } from 'react';


function DrumsPad({ sound, letter, code, volume }) {

    useEffect(() => {
        document.addEventListener('keydown', pressKey)

        return () => document.removeEventListener('keydown', pressKey)
    }, []);

    const pressKey = (e) => {
        if (e.keyCode === code) {
            playSound();
        }
    }

    const playSound = () => {
        const audioTag = document.getElementById(letter)
        audioTag.currentTime = 0;
        audioTag.volume = volume;
        audioTag.play();
        // new Audio(sound).play();

    }
  return (
      <button onClick={playSound} className='btn btn-primary rounded-3 p-4 m-2 h2'>
          <audio src={sound} id={ letter }/>
              {letter}
          </button>
  )
}

export default DrumsPad;