import './App.css';
import { boardDefault, generateWordSet} from './Words';
import { createContext, useState, useEffect} from 'react';
import { BrowserRouter, Routes, Route, Navigate} from 'react-router-dom'
import MainPage from './components/MainPage/MainPage';
import HowToPlayPage from './components/HowToPlayPage/HowToPlayPage';
import NavBar from './components/NavBar/NavBar';
import Statistics from './components/Statistics/Statistics.js';
import dictionary from './wordleBank'

export const AppContext = createContext();

const handleStorage = (stat) => {
  const statValue = window.localStorage.getItem('stats');
  const handleObject = () => {
    const statData = JSON.parse(statValue);
    const stats = statData.find((e)=> e[stat]);
    return stats[stat]
  }
  return statValue !== null
  ? handleObject()
  : 0 ;
}

function App() {
  const [board, setBoard] = useState(() => {
    const stickyValue = window.localStorage.getItem('board');
    return stickyValue !== null
      ? JSON.parse(stickyValue)
      : boardDefault ;
  });
  
  const [currAttempt, setCurrentAttempt] = useState(() => {
    const statValue = JSON.parse(window.localStorage.getItem('currAttempt'));
        
    return statValue !== null
    ? statValue
    : { attempt: 0, letterPos:0 };
  });

  const [wordSet, setWordSet] = useState(dictionary)

  // letter colors
  const [disabledLetter, setDisabledLetter] = useState([])
  const [guessedLetter, setGuessedLetter] = useState([]);
  const [almostLetter, setAlmostLetter] = useState([]);
  //game stats
  const [gamesPlayed, setGamesPlayed] = useState(handleStorage('gamesPlayed'));
  const [currentStreak, setCurrentStreak] = useState(handleStorage('currentStreak'));
  const [maxStreak, setMaxStreak] = useState(0);
  const [playerWins, setPlayerWins] = useState(handleStorage('playerWins'));
  const [winPercentage, setWinPercentage] = useState(0);
  const [playedToday,setPlayedToday] = useState(false)
  //gameOver state
  const [gameOver, setGameOver] = useState(() => {
    const stickyValue = window.localStorage.getItem('gameOver');
    return stickyValue !== null
      ? JSON.parse(stickyValue)
      : {gameOver:false, guessedWord: false} ;
  })

  const correctWord = 'spike';

  useEffect(()=>{
    setWordSet(dictionary);
  },[])

  const onSelectLetter = (keyVal) => {
    if (currAttempt.letterPos > 4) return;
    const newBoard = [...board];
    newBoard[currAttempt.attempt][currAttempt.letterPos] = keyVal;
    setBoard(newBoard);
    setCurrentAttempt({attempt:currAttempt.attempt, letterPos:  currAttempt.letterPos + 1});
  }

  const onDelete = () => {
    if (currAttempt.letterPos === 0) return;
    const newBoard = [...board]
    newBoard[currAttempt.attempt][currAttempt.letterPos - 1] = '';
    setBoard(newBoard);
    setCurrentAttempt({...currAttempt, letterPos:  currAttempt.letterPos - 1});
  }

  const onEnter = () => { 
    if (currAttempt.letterPos !== 5) return;

    let currWord = "";

    for (let i = 0; i < 5; i++){
      currWord += board[currAttempt.attempt][i];
    }

    if (wordSet.includes(currWord.toLowerCase())){
      setCurrentAttempt({ attempt: currAttempt.attempt + 1, letterPos: 0})
    }else{
      alert('palabra no encontrada')
    }

    if (currWord.toLowerCase() === correctWord){
      setGameOver({gameOver: true, guessedWord: true})

      setGamesPlayed(gamesPlayed + 1)
      setCurrentStreak(currentStreak + 1)
      setPlayerWins(playerWins + 1)
      

      return;
    }

    if (currAttempt.attempt === 5){
      setGameOver({ gameOver: true, guessedWord: false });

      setGamesPlayed(gamesPlayed + 1)
      setCurrentStreak(1)
      

      return;
    }
  }

  if (currentStreak > maxStreak){
      setMaxStreak(currentStreak)
      let percentage = (playerWins * 100) / gamesPlayed ;
      setWinPercentage(parseInt(percentage))
  }


  return (
    <AppContext.Provider
    value={{
      board,
      setBoard,
      currAttempt,
      setCurrentAttempt,
      onSelectLetter,
      onDelete,
      onEnter,
      correctWord,
      disabledLetter,
      setDisabledLetter,
      gameOver,
      guessedLetter,
      setGuessedLetter,
      almostLetter,
      setAlmostLetter,
      gamesPlayed,
      currentStreak,
      maxStreak,
      playerWins,
      winPercentage,
      playedToday,
      setPlayedToday
    }}>
     <BrowserRouter>
        <div className="App">
          <NavBar/>
          <Routes>
            <Route path="/" element={<MainPage/>}/>
            <Route path='/how-to-play' element={<HowToPlayPage/>}/>
            <Route path='/statistics' element={<Statistics/>}/>
          </Routes>
        </div>
      </BrowserRouter>
    </AppContext.Provider>
  );
}

export default App;
