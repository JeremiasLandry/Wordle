import React, {useContext} from 'react'
import { AppContext } from '../../App';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faDeleteLeft} from '@fortawesome/free-solid-svg-icons';

function Key({ keyVal, bigKey, disabled, correctGuessing, almostLetter,isIcon=false,iconKey}) {
  const {onSelectLetter, onDelete, onEnter} = useContext(AppContext);

  const selectLetter = () => {
      if (keyVal === 'ENTER') {
        onEnter()
      } else if (isIcon){
        onDelete()
      }else{
        onSelectLetter(keyVal)
      }
  }

  return (
    <div 
    className={ correctGuessing ? 'key correctGuess' : almostLetter ? 'key almostLetter' : 'key'}
    id={bigKey ? 'big': disabled && 'disabled'}
    onClick={selectLetter}
    >
        {!isIcon
        ? keyVal
        : iconKey
        }
    </div>
  )
}

export default Key