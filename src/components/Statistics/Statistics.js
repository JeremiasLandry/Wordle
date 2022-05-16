import React, {useContext} from 'react'
import { AppContext } from '../../App'
import './Statistics.css'

function Statistics() {
  const {gamesPlayed, winPercentage, currentStreak, maxStreak} = useContext(AppContext)

  return (
    <div>
        <h1>STATISTICS</h1>
        <div className="text-container">
            <span>Here you can see your <b>statistics</b> in the game</span>
            <br/>
            <div className='stats-container'>
                <div className='stat'>
                    <h3>{gamesPlayed}</h3>
                    <span>Played</span>
                </div>
                <div className='stat'>
                    <h3>{winPercentage}</h3>
                    <span>Win %</span>
                </div>
                <div className='stat'>
                    <h3>{currentStreak}</h3>
                    <span>
                        Current
                        Streak
                    </span>
                </div>
                <div className='stat'>
                    <h3>{maxStreak}</h3>
                    <span>
                        Max
                        Streak
                    </span>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Statistics