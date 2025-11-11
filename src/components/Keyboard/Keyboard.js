
import React, { useContext, useEffect, useCallback } from 'react';
import { AppContext } from '../../App';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDeleteLeft, faCheck } from '@fortawesome/free-solid-svg-icons';

const keysRow1 = ['Q','W','E','R','T','Y','U','I','O','P'];
const keysRow2 = ['A','S','D','F','G','H','J','K','L','Ñ'];
const keysRow3 = ['Z','X','C','V','B','N','M'];

export default function Keyboard() {
  const {
    onSelectLetter,
    onDelete,
    onEnter,
    boardColor,
    board,
  } = useContext(AppContext);

  // Construir sets para letras ya usadas
  const disabled = new Set();
  const green = new Set();
  const yellow = new Set();

  board.forEach((row, i) =>
    row.forEach((letter, j) => {
      const color = boardColor[i]?.[j];
      if (!letter) return;
      if (color === 'green') green.add(letter.toUpperCase());
      else if (color === 'yellow') yellow.add(letter.toUpperCase());
      else if (color === 'grey') disabled.add(letter.toUpperCase());
    })
  );

  const renderKey = (key) => {
    let className = '';
    if (green.has(key)) className = 'green';
    else if (yellow.has(key)) className = 'yellow';
    else if (disabled.has(key)) className = 'disabled';

    return (
      <button
        key={key}
        className={`key ${className}`}
        onClick={() => onSelectLetter(key)}
      >
        {key}
      </button>
    );
  };

  // Manejo de teclado físico
 const handleKeyboard = useCallback((e) => {
  if (e.key === 'Enter') onEnter();
  else if (e.key === 'Backspace') onDelete();
  else {
    const key = e.key.toUpperCase();
    if ([...keysRow1,...keysRow2,...keysRow3].includes(key)) {
      onSelectLetter(key);
    }
  }
}, [onSelectLetter, onDelete, onEnter]);


  useEffect(() => {
    document.addEventListener('keydown', handleKeyboard);
    return () => document.removeEventListener('keydown', handleKeyboard);
  }, [handleKeyboard]);

  return (
    <div className="keyboard">
      <div className="row">{keysRow1.map(renderKey)}</div>
      <div className="row">{keysRow2.map(renderKey)}</div>
      <div className="row">
        <button className="key special" onClick={onEnter}>
          <span className="key-text">ENTER</span>
          <span className="key-icon" aria-hidden>
            <FontAwesomeIcon icon={faCheck} />
          </span>
        </button>
        {keysRow3.map(renderKey)}
        <button className="key special" onClick={onDelete}>
          <FontAwesomeIcon icon={faDeleteLeft} />
        </button>
      </div>
    </div>
  );
}
