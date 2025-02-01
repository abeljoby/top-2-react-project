import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import Game from './components/Game'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Document</title>
      </head>
      <body>
        <header>
          <a href="/"><img className="logo" src="/home/abelist-cropped.png" alt="" srcSet="" /></a>
          <h1>/</h1>
          <h1>Games</h1>
          <h1>/</h1>
          <h1></h1>
          <div className="score"><span>High score: 05</span><span>Current score: 00</span></div>
        </header>
        <main>
          <Game />
        </main>
        <footer>Credit to The Odin Project for the project idea</footer>
      </body>
      </html>
    </>
  )
}

export default App
