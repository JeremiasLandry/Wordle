import React, {useContext, useEffect} from 'react'
import { AppContext } from '../../App';
import Board from '../Board/Board'
import Keyboard from '../Keyboard/Keyboard'
import GameOver from '../GameOver/GameOver'

export default function MainPage() {
  const {gameOver, gamesPlayed, currentStreak, playerWins, board, currAttempt} = useContext(AppContext);

  useEffect(()=>{
      if (gameOver.gameOver){
        if (localStorage.getItem("stats") !== null){
          localStorage.removeItem('stats')
        }
        
        let prev_items = JSON.parse(localStorage.getItem('stats')) || [];
    
        prev_items.push({gamesPlayed: gamesPlayed});
        prev_items.push({currentStreak:currentStreak});
        prev_items.push({playerWins:playerWins});
    
        localStorage.setItem('stats', JSON.stringify(prev_items));
      } 
    },[gameOver])
    

    return (
      <div className="game">
          <Board />
          {gameOver.gameOver ? <GameOver /> : <Keyboard />}
      </div>
    )
  
}
