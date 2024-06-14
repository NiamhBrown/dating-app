import React, { useEffect, useState } from 'react';
import './ConsoleText.css';

const ConsoleText = ({ words, colors }) => {
  const [visible, setVisible] = useState(true);
  const [letterCount, setLetterCount] = useState(1);
  const [x, setX] = useState(1);
  const [waiting, setWaiting] = useState(false);
  const [currentColor, setCurrentColor] = useState(colors[0]);
  const [currentWord, setCurrentWord] = useState(words[0]);

  useEffect(() => {
    if (colors === undefined) colors = ['#fff'];
    const target = document.getElementById('text');
    target.setAttribute('style', 'color:' + currentColor);

    const textInterval = setInterval(() => {
      if (letterCount === 0 && !waiting) {
        setWaiting(true);
        target.innerHTML = currentWord.substring(0, letterCount);
        setTimeout(() => {
          const newColors = [...colors.slice(1), colors[0]];
          const newWords = [...words.slice(1), words[0]];
          setCurrentColor(newColors[0]);
          setCurrentWord(newWords[0]);
          setLetterCount(1);
          setX(1);
          setWaiting(false);
          colors = newColors;
          words = newWords;
        }, 1000);
      } else if (letterCount === currentWord.length + 1 && !waiting) {
        setWaiting(true);
        setTimeout(() => {
          setX(-1);
          setLetterCount(letterCount + x);
          setWaiting(false);
        }, 1000);
      } else if (!waiting) {
        target.innerHTML = currentWord.substring(0, letterCount);
        setLetterCount(letterCount + x);
      }
    }, 120);

    return () => clearInterval(textInterval);
  }, [letterCount, waiting, currentColor, currentWord, x, colors, words]);

  useEffect(() => {
    const underscoreInterval = setInterval(() => {
      setVisible((prevVisible) => !prevVisible);
    }, 400);

    return () => clearInterval(underscoreInterval);
  }, []);

  return (
    <div className="console-container">
      <span id="text"></span>
      <div id="console" className={`console-underscore ${visible ? '' : 'hidden'}`}>
        &#95;
      </div>
    </div>
  );
};

export default ConsoleText;
