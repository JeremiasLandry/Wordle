import React, {useEffect, useContext, useCallback} from 'react'
import Key from '../Key/Key';
import { AppContext } from '../../App';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faDeleteLeft} from '@fortawesome/free-solid-svg-icons';

function Keyboard() {
  const { onEnter, onDelete, onSelectLetter, disabledLetter, guessedLetter, almostLetter} = useContext(AppContext);  

  const keys1 = ["Q","W","E","R", "T", "Y", "U", "I", "O", "P"];
  const keys2 = ["A","S","D","F", "G", "H", "J", "K", "L", "Ñ"];
  const keys3 = ["Z","X","C","V","B","N", "M"];  

  const handleKeyboard = useCallback((e) => {
      if (e.key === 'Enter'){
        onEnter()
      }else if (e.key === 'Backspace'){
        onDelete()
      }else{
          keys1.forEach((key)=>{
              if (e.key.toLowerCase() === key.toLowerCase()){
                  onSelectLetter(key)
              }
          })
          keys2.forEach((key)=>{
            if (e.key.toLowerCase() === key.toLowerCase()){
                onSelectLetter(key)
            }
          })
          keys3.forEach((key)=>{
              if (e.key.toLowerCase() === key.toLowerCase()){
                  onSelectLetter(key)
              }
          })
      }
  })  

  useEffect(() => {
    document.addEventListener('keydown', handleKeyboard)

    return () => {
        document.removeEventListener('keydown', handleKeyboard)
    }
  }, [handleKeyboard])

  return (
    <div className='keyboard' onKeyDown={handleKeyboard}>
        <div className='line1'>
            {keys1.map((key) => {
                return <Key 
                keyVal={key} 
                disabled={disabledLetter.includes(key)} 
                correctGuessing={guessedLetter.includes(key)}
                almostLetter={almostLetter.includes(key)}
                />
            })}
        </div>
        <div className='line2'>
            {keys2.map((key) => {
                return <Key 
                keyVal={key} 
                disabled={disabledLetter.includes(key)} 
                correctGuessing={guessedLetter.includes(key)}
                almostLetter={almostLetter.includes(key)}
                />
            })}
        </div>
        <div className='line3'>
            <Key keyVal={'ENTER'} bigKey/>
            {keys3.map((key) => {
                return <Key 
                keyVal={key} 
                disabled={disabledLetter.includes(key)} 
                correctGuessing={guessedLetter.includes(key)}
                almostLetter={almostLetter.includes(key)}
                />
            })}
            <Key isIcon={true} iconKey={<FontAwesomeIcon icon={faDeleteLeft}/>} bigKey/>
        </div>
    </div>
  )
}

export default Keyboard