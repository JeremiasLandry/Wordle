import './App.css';
import { boardDefault } from './Words';
import { createContext, useState, useEffect} from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import MainPage from './components/MainPage/MainPage';
import HowToPlayPage from './components/HowToPlayPage/HowToPlayPage';
import NavBar from './components/NavBar/NavBar';
import Statistics from './components/Statistics/Statistics.js';
import dictionary, { getCharacterForDate } from './wordleBank';
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
  // daily word
  const [correctWord, setCorrectWord] = useState('mario');
  const [currentCharacter, setCurrentCharacter] = useState(null);
  const [playableCharacters, setPlayableCharacters] = useState([]);
  const [today, setToday] = useState(localStorage.getItem('today') !== null ? localStorage.getItem('today') : 0);
  const [tomorrow, setTomorrow] = useState(localStorage.getItem('tomorrow') !== null ? localStorage.getItem('tomorrow') : 0);

  function resetGame(todaysDate){
    localStorage.setItem('fullDate', JSON.stringify(todaysDate))
    const todayData = new Date();
    const tomorrowData = new Date(todayData);
    tomorrowData.setDate(tomorrowData.getDate() + 1)
    tomorrowData.setHours(0,0,0,0)
    localStorage.setItem('today',JSON.stringify(todayData.getTime()))
    localStorage.setItem('tomorrow',JSON.stringify(tomorrowData.getTime()))
    setToday(todayData.getTime())
    setTomorrow(tomorrowData.getTime())

    localStorage.removeItem('gameOver');
    localStorage.removeItem('board');
    localStorage.removeItem('currAttempt');
    localStorage.removeItem('boardColor');
    setBoard(boardDefault);
    setBoardColor(emptyColors());
    // setBoardColor(Array(6).fill(Array(5).fill('grey')));
    setGameOver({gameOver:false, guessedWord: false})
    setCurrentAttempt({ attempt: 0, letterPos:0 })
  }

  function getTodaysDate(){
    let date = new Date()
    let day = date.getDate()
    let month = date.getMonth() + 1
    let year = date.getFullYear()
    return month < 10 ? `${day}-0${month}-${year}` : `${day}-${month}-${year}`;
  }

  function playedToday(){
    if(localStorage.getItem('fullDate') !== null){
      const oldDate = JSON.parse(localStorage.getItem('fullDate'));
      const todayDate = getTodaysDate();
      if (todayDate !== oldDate){
        resetGame(todayDate)
      }
    }else{
      resetGame(getTodaysDate())
    }
  }

  useEffect(()=>{ playedToday() },[])

  // Load playableCharacters.json and set currentCharacter
  useEffect(() => {
    fetch('/playableCharacters.json')
      .then(res => res.json())
      .then(chars => {
        setPlayableCharacters(chars);
        const char = getCharacterForDate(chars, new Date());
        setCurrentCharacter(char);
        if (char && char.word && char.word.length === 5) {
          setCorrectWord(char.word);
        } else if (char && char.title && char.title.length === 5) {
          setCorrectWord(char.title);
        } else {
          setCorrectWord('mario');
        }
      });
  }, []);

  const [board, setBoard] = useState(() => {
  const stickyValue = window.localStorage.getItem('board');
  if (stickyValue !== null) {
    return JSON.parse(stickyValue);
  }
  return boardDefault;
});

  const emptyColors = () => Array.from({ length: 6 }, () => Array(5).fill(''));

  const [boardColor, setBoardColor] = useState(() => {
  const stickyValue = window.localStorage.getItem('boardColor');
  if (stickyValue !== null) {
    return JSON.parse(stickyValue);
  }
  return emptyColors();
});

  const [currAttempt, setCurrentAttempt] = useState(() => {
    const statValue = JSON.parse(window.localStorage.getItem('currAttempt'));
    if (statValue !== null) return statValue;

    // Si hay board guardado, calcula el primer espacio vacío
    const stickyBoard = window.localStorage.getItem('board');
    if (stickyBoard) {
      const boardArr = JSON.parse(stickyBoard);
      for (let i = 0; i < boardArr.length; i++) {
        for (let j = 0; j < boardArr[i].length; j++) {
          if (boardArr[i][j] === "") {
            return { attempt: i, letterPos: j };
          }
        }
      }
      // Si el board está lleno
      return { attempt: boardArr.length, letterPos: 0 };
    }
    return { attempt: 0, letterPos: 0 };
  });

  const [wordSet, setWordSet] = useState(dictionary)
  const [gameOver, setGameOver] = useState(() => {
    const stickyValue = window.localStorage.getItem('gameOver');
    return stickyValue !== null
      ? JSON.parse(stickyValue)
      : {gameOver:false, guessedWord: false} ;
  });

  const [gamesPlayed, setGamesPlayed] = useState(handleStorage('gamesPlayed'));
  const [currentStreak, setCurrentStreak] = useState(handleStorage('currentStreak'));
  const [maxStreak, setMaxStreak] = useState(0);
  const [playerWins, setPlayerWins] = useState(handleStorage('playerWins'));
  const [winPercentage, setWinPercentage] = useState(0);

  const [modalShow,setModalShow] = useState(false);

  useEffect(()=>{ setWordSet(dictionary); },[])

  const onSelectLetter = (keyVal) => {
    if (currAttempt.letterPos > 4) return;
    const newBoard = [...board];
    newBoard[currAttempt.attempt][currAttempt.letterPos] = keyVal;
    setBoard(newBoard);
    localStorage.setItem('board', JSON.stringify(newBoard)); // <-- Guarda el board
    setCurrentAttempt({attempt:currAttempt.attempt, letterPos: currAttempt.letterPos + 1});
  }

  const onDelete = () => {
    if (currAttempt.letterPos === 0) return;
    const newBoard = [...board]
    newBoard[currAttempt.attempt][currAttempt.letterPos - 1] = '';
    setBoard(newBoard);
    localStorage.setItem('board', JSON.stringify(newBoard)); // <-- Guarda el board
    setCurrentAttempt({...currAttempt, letterPos: currAttempt.letterPos - 1});
  }

  const onEnter = () => { 
    if (currAttempt.letterPos !== 5) return;

    let currWord = board[currAttempt.attempt].join('').toLowerCase();

    if (!wordSet.includes(currWord)){
      setModalShow(true)
      return;
    }

    const correctWordLower = correctWord.toLowerCase();
    const letterCount = {};
    for (let char of correctWordLower){
      letterCount[char] = (letterCount[char] || 0) + 1;
    }

    const colors = Array(5).fill('grey');

    // Marcar verdes
    for (let i = 0; i < 5; i++){
      if (currWord[i] === correctWordLower[i]){
        colors[i] = 'green';
        letterCount[currWord[i]]--;
      }
    }

    // Marcar amarillos
    for (let i = 0; i < 5; i++){
      if (colors[i] === 'grey' && letterCount[currWord[i]] > 0){
        colors[i] = 'yellow';
        letterCount[currWord[i]]--;
      }
    }

    const newBoardColor = [...boardColor];
    newBoardColor[currAttempt.attempt] = colors;
    setBoardColor(newBoardColor);
    localStorage.setItem('boardColor', JSON.stringify(newBoardColor));
    localStorage.setItem('board', JSON.stringify(board)); // <-- Guarda el board

    setCurrentAttempt({ attempt: currAttempt.attempt + 1, letterPos: 0});
    localStorage.setItem('currWord', currWord);

    // stats y gameOver
    if (currWord === correctWordLower){
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
      boardColor,
      setBoardColor,
      currAttempt,
      setCurrentAttempt,
      onSelectLetter,
      onDelete,
      onEnter,
      correctWord,
      gameOver,
      gamesPlayed,
      currentStreak,
      maxStreak,
      playerWins,
      winPercentage,
      modalShow,
      setModalShow,
      setCorrectWord,
      currentCharacter,
      playableCharacters
    }}>
     <BrowserRouter>
        <div className="App">
          <NavBar/>
          { modalShow && <Warning/> }
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
