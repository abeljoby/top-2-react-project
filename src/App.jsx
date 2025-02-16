import { useState } from 'react'
import abelistLogo from  './assets/images/abelist-cropped.png'
import Game from './components/Game/Game'
import './App.css'

function App() {


  return (
    <>
      <header>
        <a href="https://abel.ist"><img className="logo" src={abelistLogo} alt=""/></a>
        <h1 className='hide'>/</h1>
        <h1 className='hide'>Games</h1>
        <h1>/</h1>
        <h1>Memory Game</h1>
      </header>
      <main>
        <Game/>
      </main>
      <footer>Credit to The Odin Project for the project idea</footer>
    </>
  );
}

export default App
