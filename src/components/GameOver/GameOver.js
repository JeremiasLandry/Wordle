import React, {useContext, useState, useEffect} from 'react'
import { AppContext } from "../../App"
import Modal from '../Modal/Modal.js'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faCheck} from '@fortawesome/free-solid-svg-icons'
import dailyPic from './dailyPic.jpg';
import './GameOver.css'

function GameOver() {
  const {gameOver, correctWord, currAttempt, setPlayedToday, board } = useContext(AppContext)
  const [activeModal,setActiveModal] = useState(true);
  
  useEffect(()=>{
    setPlayedToday(true)
  },[])

  localStorage.setItem("board", JSON.stringify(board))
  localStorage.setItem("gameOver", JSON.stringify(gameOver))
  localStorage.setItem("currAttempt", JSON.stringify(currAttempt))

  return (
    <Modal activeModal={activeModal} setActiveModal={setActiveModal}>
      <div className='gameOver'>
          <h1>{correctWord.toUpperCase()} (Toy Story)</h1>
          <img className='dailyPic' src={dailyPic} alt='DailyPic'/>
          <h3>
          {
            gameOver.guessedWord ? 
            <div><span>Acertaste correctamente </span><FontAwesomeIcon style={{color: '#64DFDF'}} icon={faCheck}/></div> : 
            "Fallaste"
          }
          </h3>
          {gameOver.guessedWord && (<p className='gameOver-text'>Acertaste en {currAttempt.attempt} intento/s</p>)}
      </div>
    </Modal>
  )
}

export default GameOver