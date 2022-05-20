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
            <span>Guess the <b>CHARDLE</b> in six tries</span>
            <br/>
            <span>Each guess must be a valid five-letter word conforming a fictional character's name. Hit the enter button to submit</span>
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
                    <GameTile letter='s' evaluation='correct'/>
                    <GameTile letter='t'/>
                    <GameTile letter='a'/>
                    <GameTile letter='r'/>
                    <GameTile letter='k'/>
                </div>
                <p>
                The letter <strong>S</strong> is in the word and in the correct spot.
                </p>
            </div>
            <div className='example'>
                <div className='row'>
                    <GameTile letter='f'/>
                    <GameTile letter='r' evaluation='almost'/>
                    <GameTile letter='o'/>
                    <GameTile letter='d'/>
                    <GameTile letter='o'/>
                </div>
                <p>
                The letter <strong>R</strong> is in the word but in the wrong spot.
                </p>
            </div>
            <div className='example'>
                <div className='row'>
                    <GameTile letter='a'/>
                    <GameTile letter='n'/>
                    <GameTile letter='n'/>
                    <GameTile letter='i' evaluation='notInTheWord'/>
                    <GameTile letter='e'/>
                </div>
                <p>
                The letter <strong>I</strong> is not in the word in any spot.
                </p>
            </div>
        </div>
        <p style={{marginBottom:25+'px'}}><strong>A new CHARDLE will be available each day!</strong></p>
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