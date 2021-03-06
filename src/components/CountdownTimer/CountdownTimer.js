import {useState, useEffect, useContext} from 'react';
import {getRemainingTimeUntilMsTimestamp} from './Utils/CountdownTimerUtils';
import { AppContext } from '../../App'
import './CountdownTimer.css';

const defaultRemainingTime = {
    seconds: '00',
    minutes: '00',
    hours: '00',
    days: '00'
}

const CountdownTimer = ({countdownTimestampMs}) => {
    const {gameOver, board, currAttempt, correctWord, setCorrectWord} = useContext(AppContext);

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
    
    if (remainingTime.days === '00' && remainingTime.hours === '00' && remainingTime.minutes === '00' && remainingTime.seconds === '01') {
        localStorage.removeItem('gameOver');
        localStorage.removeItem('board');
        localStorage.removeItem('currAttempt');
        setCorrectWord('waiting for next character')
    }

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