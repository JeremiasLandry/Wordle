import React, { useContext, useEffect} from 'react'
import { AppContext } from '../../App';

function Letter({ letterPos, attemptVal }) {
  const {board, correctWord, currAttempt, setGuessedLetter, setDisabledLetter, setAlmostLetter, alreadyGuessed, setAlreadyGuessed} = useContext(AppContext);
  const letter = board[attemptVal][letterPos];
  
  const correct = correctWord.toUpperCase()[letterPos] === letter;
  const almost = !correct && letter !== '' && correctWord.toUpperCase().includes(letter);

  let letterState = 
    currAttempt.attempt > attemptVal && 
    (correct ? 'correct' : almost ? 'almost' : 'error');

  useEffect(()=>{
    if(letter !== "" && !correct && !almost){
        setDisabledLetter((prev) => [...prev, letter])
    }else if (correct){
      setGuessedLetter((prev) => [...prev, letter])
    }else if (almost){
      setAlmostLetter((prev) => [...prev, letter])
    }
  },[currAttempt.attempt])

  return (
    <div className='letter' id={letterState}>
      {" "}
      {letter}
    </div>
  )
}

export default Letter