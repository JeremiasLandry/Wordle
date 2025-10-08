import React, { useContext, useEffect } from 'react';
import { AppContext } from '../../App';
import Board from '../Board/Board';
import Keyboard from '../Keyboard/Keyboard';
import GameOver from '../GameOver/GameOver';

export default function MainPage() {
  const {
    gameOver,
    gamesPlayed,
    currentStreak,
    playerWins,
    board,
    boardColor,
    currAttempt
  } = useContext(AppContext);

  useEffect(() => {
    if (gameOver.gameOver) {
      // Recuperar stats previos del localStorage
      const prevStats = JSON.parse(localStorage.getItem('stats')) || [];

      // Filtrar stats del mismo día para no duplicar
      const newStats = prevStats.filter(e => e.date !== new Date().toDateString());

      // Agregar la estadística actual
      newStats.push({
        date: new Date().toDateString(),
        gamesPlayed,
        currentStreak,
        playerWins
      });

      // Guardar nuevamente
      localStorage.setItem('stats', JSON.stringify(newStats));
    }
  }, [gameOver, gamesPlayed, currentStreak, playerWins]);

  return (
    <div className="game">
      <Board board={board} boardColor={boardColor} currAttempt={currAttempt} />
      {gameOver.gameOver ? <GameOver /> : <Keyboard />}
    </div>
  );
}
