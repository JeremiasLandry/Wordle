import React, {useContext} from 'react'
import { AppContext } from "../../App"

function GameOver() {
  const {gameOver, correctWord, currAttempt, setPlayedToday, board} = useContext(AppContext)
  setPlayedToday(true)

  localStorage.setItem("board", JSON.stringify(board))
  localStorage.setItem("gameOver", JSON.stringify(gameOver))
  localStorage.setItem("currAttempt", JSON.stringify(currAttempt))

  return (
    <div className='gameOver'>
        <h3>{gameOver.guessedWord ? "Acertaste correctamente" : "Fallaste" }</h3>
        <h1>PALABRA: {correctWord}</h1>
        {gameOver.guessedWord && (<h3>Acertaste en {currAttempt.attempt} intento/s</h3>)}
    </div>
  )
}

export default GameOver