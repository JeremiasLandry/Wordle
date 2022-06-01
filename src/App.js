import './App.css';
import { boardDefault, generateWordSet} from './Words';
import { createContext, useState, useEffect} from 'react';
import { BrowserRouter, Routes, Route, Navigate} from 'react-router-dom'
import MainPage from './components/MainPage/MainPage';
import HowToPlayPage from './components/HowToPlayPage/HowToPlayPage';
import NavBar from './components/NavBar/NavBar';
import Statistics from './components/Statistics/Statistics.js';
import dictionary from './wordleBank';
import Warning from './components/Warning/Warning';

const handleStorage = (stat) => {
  const statValue = window.localStorage.getItem('stats');
  const handleObject = () => {
    const statData = JSON.parse(statValue);
    const stats = statData.find((e)=> e[stat]) ? statData.find((e)=> e[stat]) : 0;
    return stats[stat]
  }
  return statValue !== null
  ? handleObject()
  : 0 ;
}

export const AppContext = createContext();

function App() {
  const [today, setToday] = useState(localStorage.getItem('today') !== null ? localStorage.getItem('today') : 0);
  const [tomorrow, setTomorrow] = useState(localStorage.getItem('tomorrow') !== null ? localStorage.getItem('tomorrow') : 0);

  //Reset the board and the attemps when countdown is 00;
  function resetGame(todaysDate){
    localStorage.setItem('fullDate', JSON.stringify(todaysDate))

    const todayData = new Date();
    const tomorrowData = new Date(todayData);
    tomorrowData.setDate(tomorrowData.getDate() + 1)
    tomorrowData.setHours(0,0,0,0)
    //save data
    localStorage.setItem('today',JSON.stringify(todayData.getTime()))
    localStorage.setItem('tomorrow',JSON.stringify(tomorrowData.getTime()))
    setToday(todayData.getTime())
    setTomorrow(tomorrowData.getTime())

    //reset states
    localStorage.removeItem('gameOver');
    localStorage.removeItem('board');
    localStorage.removeItem('currAttempt');
    
  }

  function getTodaysDate(){
    let date = new Date()

    let day = date.getDate()
    let month = date.getMonth() + 1
    let year = date.getFullYear()

    let fullDate;

    if(month < 10){
      fullDate = `${day}-0${month}-${year}`;
    }else{
      fullDate = `${day}-${month}-${year}`;
    }
    return fullDate
  }

  function playedToday(){
    if(localStorage.getItem('fullDate') !== null){
      const oldDate = JSON.parse(localStorage.getItem('fullDate'));
      const todayDate = getTodaysDate();
      if (todayDate !== oldDate){
        resetGame(todayDate)
      }
    }else{
      const todayStatus = getTodaysDate();
      localStorage.setItem('fullDate', JSON.stringify(todayStatus));
      resetGame(todayStatus)
    }
  }

  useEffect(()=>{
    playedToday() 
  },[today,tomorrow])

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
  //game stats and states
  const [gamesPlayed, setGamesPlayed] = useState(handleStorage('gamesPlayed'));
  const [currentStreak, setCurrentStreak] = useState(handleStorage('currentStreak'));
  const [maxStreak, setMaxStreak] = useState(0);
  const [playerWins, setPlayerWins] = useState(handleStorage('playerWins'));
  const [winPercentage, setWinPercentage] = useState(0);
  //gameOver state
  const [gameOver, setGameOver] = useState(() => {
    const stickyValue = window.localStorage.getItem('gameOver');
    return stickyValue !== null
      ? JSON.parse(stickyValue)
      : {gameOver:false, guessedWord: false} ;
  })
  //daily word
  const correctWord = 'bambi';
  //modal state for: 'word not found' warning
  const [modalShow,setModalShow] = useState(false);

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
      localStorage.setItem('currWord', currWord)
    }else{
      setModalShow(true)
    }

    if (currWord.toLowerCase() === correctWord){
      localStorage.setItem('currWord', currWord)
      setGameOver({gameOver: true, guessedWord: true})
      setGamesPlayed(gamesPlayed + 1)
      setCurrentStreak(currentStreak + 1)
      setPlayerWins(playerWins + 1)

      let percentage = (playerWins * 100) / gamesPlayed ;
      setWinPercentage(parseInt(percentage))
      
      return;
    }

    if (currAttempt.attempt === 5){
      
      setGameOver({ gameOver: true, guessedWord: false });
      localStorage.setItem('currWord', currWord)
      setGamesPlayed(gamesPlayed + 1)
      setCurrentStreak(1)
      let percentage = (playerWins * 100) / gamesPlayed ;
      setWinPercentage(parseInt(percentage))

      return;
    }
  }

  if (currentStreak > maxStreak){
      setMaxStreak(currentStreak)
      let percentage = (playerWins * 100) / gamesPlayed ;
      setWinPercentage(parseInt(percentage))
  }

  useEffect(() =>{
      if (gamesPlayed > 0 && playerWins === 0 || isNaN(winPercentage)){
      setWinPercentage(0)
    }
  },[gamesPlayed])
  

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
      modalShow,
      setModalShow
    }}>
     <BrowserRouter>
        <div className="App">
          <NavBar/>
          <hr/>
          {
            modalShow
            ? <Warning/>
            : ''
          }
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
