import { useState } from "react"

import GameBoard from "./components/GameBoard/GameBoard"
import Player from "./components/Player/Player"
import Log from "./components/Log/Log";
import GameOver from "./components/GameOver/GameOver";
import { PLAYERS, deriveActivePlayer, deriveGameBoard, deriveWinner } from "./helpers/helpers";


function App() {
  const [players, setPlayers] = useState({
    'X': 'Player 1',
    'O': 'Player 2'
  });
  const [gameTurns, setGameTurns] = useState([]);

  const activePlayer = deriveActivePlayer(gameTurns);
  const gameBoard = deriveGameBoard(gameTurns)
  const winner = deriveWinner(gameBoard, players)
  const hasDraw = gameTurns.length === 9 && !winner;

  function handleSquareClick(rowIndex, colIndex) {
    setGameTurns(prevTurns => {
      let currentPlayer = deriveActivePlayer(prevTurns);
      const updatedTurns = [
        { 
          square: {row: rowIndex, col: colIndex},
          player: currentPlayer
        }, ...prevTurns
      ];
      return updatedTurns;
    });
  }

  function handleRestart() {
    setGameTurns([]);
  }

  function handlePlayerNameChange(symbol, newName) {
    setPlayers(prevPlayers => {
      return {
        ...prevPlayers,
        [symbol]: newName 
      };
    });
  }

  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player initialPlayerName={PLAYERS.X} symbol="X" isActive={ activePlayer === "X" } onNameChange={handlePlayerNameChange}/>
          <Player initialPlayerName={PLAYERS.O} symbol="O" isActive={ activePlayer === "O" } onNameChange={handlePlayerNameChange}/>
        </ol>
        {(winner || hasDraw) && <GameOver winner={winner} onRestart={handleRestart}/>}
        <GameBoard onSelectSquare={handleSquareClick}  board={gameBoard}/>
      </div>
      <Log turns={gameTurns}/>
    </main>
  )
}

export default App
