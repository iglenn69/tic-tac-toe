import { useState } from "react";
import Player from "./components/Player";
import GameBoard from "./components/GameBoard";
import Log from "./components/Log";
import { WINNING_COMBINATIONS } from "./winning-combinations";
import GameOver from "./components/GameOver";

const initialGameBoard = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];

/**
 * Determines the active player based on the current turns.
 * @param {Array} turns - An array of objects representing the turns taken by each player.
 * @returns {string} - The current active player, either "X" or "O".
 */
function deriveActivePlayer(turns) {
  let currentPlayer = "X";
  if (turns.length > 0) {
    currentPlayer = turns[0].player === "X" ? "O" : "X";
  }
  return currentPlayer;
}

function App() {
  const [players, setPlayers] = useState({  X: "Player 1", O: "Player 2" });
  const [gameTurns, setGameTurns] = useState([]);
  const activePlayer = deriveActivePlayer(gameTurns);
  let gameBoard = [...initialGameBoard.map((row) => [...row])];

  for (const turn of gameTurns) {
    const { square, player } = turn;
    const { row, col } = square;
    gameBoard[row][col] = player;
  }

  let winner;

  for (const combination of WINNING_COMBINATIONS) {
    const firstSquareSymbol =
      gameBoard[combination[0].row][combination[0].column];
    const secondSquareSymbol =
      gameBoard[combination[1].row][combination[1].column];
    const thirdSquareSymbol =
      gameBoard[combination[2].row][combination[2].column];

    if (
      firstSquareSymbol &&
      firstSquareSymbol === secondSquareSymbol &&
      firstSquareSymbol === thirdSquareSymbol
    ) {
      winner = players[firstSquareSymbol];
    }
  }
  const hasDrawn = gameTurns.length === 9 && !winner;

  /**
   * Handles the click event on a square.
   * @function
   * @name handleSquareClick
   * @returns {void}
   */
  function handleSelectSquare(rowIndex, colIndex) {
    setGameTurns((prevGameTurns) => {
      const currentPlayer = deriveActivePlayer(prevGameTurns);
      return [
        { square: { row: rowIndex, col: colIndex }, player: currentPlayer },
        ...prevGameTurns,
      ];
    });
  }

  function handleResetClick() {
    setGameTurns([]);
  } 
function handlePlayerNameChange(symbol, newName) {
    setPlayers((prevPlayers) => {
      return { ...prevPlayers, [symbol]: newName };
    });
  }
  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player
            initialName="Player 1"
            symbol="X"
            isActive={activePlayer === "X"}
            onChangeName={handlePlayerNameChange}
          />
          <Player
            initialName="Player 2"
            symbol="O"
            isActive={activePlayer === "O"}
            onChangeName={handlePlayerNameChange}
          />
        </ol>
        {(winner || hasDrawn) && <GameOver winner={winner} onRestart={handleResetClick}/>}
        <GameBoard onSelectSquare={handleSelectSquare} board={gameBoard} />
      </div>
      <Log turns={gameTurns} />
    </main>
  );
}

export default App;
