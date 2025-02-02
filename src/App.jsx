import { useState } from 'react'
import abelistLogo from  './assets/images/abelist-cropped.png'
import Game from './components/Game/Game'
import './App.css'

function App() {
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);

  function addScore() {
    if(score === highScore) {
      setHighScore(score+1);
    }
    setScore(score+1);
  }

  function resetScore() {
    setScore(0);
  }

  return (
    <>
      {/* <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Document</title>
      </head> */}
      <header>
        <a href="https://abel.ist"><img className="logo" src={abelistLogo} alt=""/></a>
        <h1>/</h1>
        <h1>Games</h1>
        <h1>/</h1>
        <h1>Memory Game</h1>
        <div className="score"><span>High score: {highScore.toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false})}</span><span>Current score: {score.toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false})}</span></div>
      </header>
      <main>
        <Game score={score} addScore={addScore} resetScore={resetScore}/>
      </main>
      <footer>Credit to The Odin Project for the project idea</footer>
    </>
  );
}

export default App
