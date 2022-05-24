import React, {useContext, useState, useEffect} from 'react'
import { AppContext } from "../../App"
import Modal from '../Modal/Modal.js'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faCheck} from '@fortawesome/free-solid-svg-icons'
import dailyPic from './dailyPic.jpg';
import './GameOver.css';
import CountdownTimer from '../CountdownTimer/CountdownTimer'

function GameOver() {
  const {gameOver, correctWord, currAttempt, setPlayedToday, board } = useContext(AppContext)
  const [activeModal,setActiveModal] = useState(true);
  
  useEffect(()=>{
    setPlayedToday(true)
  },[])

  localStorage.setItem("board", JSON.stringify(board))
  localStorage.setItem("gameOver", JSON.stringify(gameOver))
  localStorage.setItem("currAttempt", JSON.stringify(currAttempt))
  const dateFrom = new Date("2022-05-15T03:00:00");

  return (
    <Modal activeModal={activeModal} setActiveModal={setActiveModal}>
      <div className='gameOver'>
          <h1>{correctWord.toUpperCase()} (Toy Story)</h1>
          <img className='dailyPic' src={dailyPic} alt='DailyPic'/>
          <h3>
          {
            gameOver.guessedWord ? 
            <div className='gameOver-msg'><span>Nice, you win! </span><FontAwesomeIcon style={{color: '#64DFDF'}} icon={faCheck}/></div> : 
            "You failed :( ..."
          }
          </h3>
          {gameOver.guessedWord && (<p className='gameOver-text gameOver-msg'>you got it right in {currAttempt.attempt} attempt/s</p>)}
          <hr style={{width: '100%'}}/>
          <span className='gameOver-nextChardle'>NEXT CHARDLE:</span>
          <CountdownTimer countdownTimestampMs={1653361200000}/>
      </div>
    </Modal>
  )
}

export default GameOver