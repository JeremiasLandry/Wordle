import React, {useContext, useState, useEffect} from 'react'
import { AppContext } from "../../App"
import Modal from '../Modal/Modal.js'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faCheck, faXmark} from '@fortawesome/free-solid-svg-icons'
// import dailyPic from './dailyPic.jpg';
import './GameOver.css';
import CountdownTimer from '../CountdownTimer/CountdownTimer'

function GameOver() {
  const {gameOver, correctWord, currAttempt, board, currentCharacter} = useContext(AppContext)
  const [activeModal,setActiveModal] = useState(true);

  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1)
  tomorrow.setHours(0,0,0,0)

  return (
    <Modal 
    activeModal={activeModal} 
    setActiveModal={setActiveModal} 
    wrapperClass="wrapper" 
    windowClass="window" 
    buttonShow={true}
    >
      <div className='gameOver'>
          <h1>{currentCharacter ? currentCharacter.title.toUpperCase() : correctWord.toUpperCase()}</h1>
          <img className='dailyPic' src={currentCharacter ? currentCharacter.imageUrl : ''} alt={currentCharacter ? currentCharacter.title : 'DailyPic'} style={{maxWidth:'180px',borderRadius:'12px',margin:'10px 0'}}/>
          <h3>
          {
            gameOver.guessedWord ? 
            <div className='gameOver-msg'><span>Nice, you win! </span><FontAwesomeIcon style={{color: '#64DFDF'}} icon={faCheck}/></div> : 
            <div className='gameOver-msg'>You failed <span><FontAwesomeIcon style={{color: '#f37575'}} icon={faXmark}/></span></div>
          }
          </h3>
          {gameOver.guessedWord && (<p className='gameOver-text gameOver-msg'>you got it right in {currAttempt.attempt} attempt/s</p>)}
          <hr style={{width: '100%'}}/>
          <span className='gameOver-nextChardle'>NEXT CHARDEX:</span>
          <CountdownTimer countdownTimestampMs={tomorrow}/>
      </div>
    </Modal>
  )
}

export default GameOver