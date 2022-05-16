import React from 'react'

function GameTile({letter, evaluation}) {
  return (
    <div className={'tile ' + evaluation}>
        <p>{letter}</p>
    </div>
  )
}

export default GameTile