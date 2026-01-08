
import {useState, useEffect, useContext} from 'react';
import {getRemainingTimeUntilMsTimestamp} from './Utils/CountdownTimerUtils';
import { AppContext } from '../../App';
import { getCharacterForDate } from '../../wordleBank';
import './CountdownTimer.css';

const defaultRemainingTime = {
    seconds: '00',
    minutes: '00',
    hours: '00',
    days: '00'
}



const CountdownTimer = ({countdownTimestampMs}) => {
    const {gameOver, board, currAttempt, correctWord, setCorrectWord, setCurrentCharacter, playableCharacters} = useContext(AppContext);

    localStorage.setItem("board", JSON.stringify(board))
    localStorage.setItem("gameOver", JSON.stringify(gameOver))
    localStorage.setItem("currAttempt", JSON.stringify(currAttempt))

    const [remainingTime, setRemainingTime] = useState(defaultRemainingTime);

    useEffect(() => {
        const intervalId = setInterval(() => {
            updateRemainingTime(countdownTimestampMs);
        }, 1000);
        return () => clearInterval(intervalId);
    },[countdownTimestampMs]);

    function updateRemainingTime(countdown) {
        setRemainingTime(getRemainingTimeUntilMsTimestamp(countdown));
    }
    
    useEffect(() => {
        if (remainingTime.days === '00' && remainingTime.hours === '00' && remainingTime.minutes === '00' && remainingTime.seconds === '01') {
            localStorage.removeItem('gameOver');
            localStorage.removeItem('board');
            localStorage.removeItem('currAttempt');
            // Calcular personaje y palabra del nuevo día
            const tomorrow = new Date();
            tomorrow.setDate(tomorrow.getDate() + 1);
            tomorrow.setHours(0,0,0,0);
            if (playableCharacters && playableCharacters.length > 0) {
                const nextChar = getCharacterForDate(playableCharacters, tomorrow);
                setCurrentCharacter && setCurrentCharacter(nextChar);
                if (nextChar && nextChar.word && nextChar.word.length === 5) {
                    setCorrectWord(nextChar.word);
                } else if (nextChar && nextChar.title && nextChar.title.length === 5) {
                    setCorrectWord(nextChar.title);
                } else {
                    setCorrectWord('mario');
                }
            } else {
                setCorrectWord('waiting for next character');
            }
        }
    }, [remainingTime, playableCharacters, setCurrentCharacter, setCorrectWord]);

    return(
        <div className="countdown-timer">
            <div className='time-group'>
                <span>{remainingTime.days}</span>
                <span>Days</span>
            </div>
            <div className='time-group'>
                <span className="two-numbers">{remainingTime.hours}</span>
                <span>Hours</span>
            </div>
            <div className='time-group'>
                <span className="two-numbers">{remainingTime.minutes}</span>
                <span>Minutes</span>
            </div>
            <div className='time-group'>
                <span className="two-numbers">{remainingTime.seconds}</span>
                <span>Seconds</span>
            </div>
        </div>
    );
}

export default CountdownTimer;