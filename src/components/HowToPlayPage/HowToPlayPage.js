import React from 'react';
import { useNavigate, Link} from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import GameTile from '../GameTile/GameTile';

function HowToPlayPage() {
  return (
    <div className='how-to-play'>
        <h1>HOW TO PLAY</h1>
        <div className="text-container">
            <span>Guess the <b>WORDLE</b> in six tries</span>
            <br/>
            <span>Each guess must be a valid five-letter word. Hit the enter button to submit</span>
            <br/>
            <span>After each guess, the color of the tiles will change to show how close your guess was to the word.</span>
        </div>
        <br/>
        <div className="Examples">
            <p>
                <strong>Examples</strong>
            </p>
            <div className='example'>
                <div className='row'>
                    <GameTile letter='w' evaluation='correct'/>
                    <GameTile letter='e'/>
                    <GameTile letter='a'/>
                    <GameTile letter='r'/>
                    <GameTile letter='y'/>
                </div>
                <p>
                The letter <strong>W</strong> is in the word and in the correct spot.
                </p>
            </div>
            <div className='example'>
                <div className='row'>
                    <GameTile letter='p'/>
                    <GameTile letter='i' evaluation='almost'/>
                    <GameTile letter='l'/>
                    <GameTile letter='l'/>
                    <GameTile letter='s'/>
                </div>
                <p>
                The letter <strong>I</strong> is in the word but in the wrong spot.
                </p>
            </div>
            <div className='example'>
                <div className='row'>
                    <GameTile letter='v'/>
                    <GameTile letter='a'/>
                    <GameTile letter='g'/>
                    <GameTile letter='u' evaluation='notInTheWord'/>
                    <GameTile letter='e'/>
                </div>
                <p>
                The letter <strong>U</strong> is not in the word in any spot.
                </p>
            </div>
        </div>
        <p style={{marginBottom:25+'px'}}><strong>A new WORDLE will be available each day!</strong></p>
        <Link to='/' className='getBack-btn'>
            <FontAwesomeIcon icon={faArrowLeft}/>
            <span style={{marginLeft:8+'px'}}>
                GET BACK TO THE GAME
            </span>
        </Link>
    </div>
  )
}

export default HowToPlayPage