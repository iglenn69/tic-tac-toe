import { useState } from "react";
import Player from "./components/Player";
import GameBoard from "./components/GameBoard";
import Log from "./components/Log";

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
  const [gameTurns, setGameTurns] = useState([]);
  const activePlayer = deriveActivePlayer(gameTurns);

  /**
   * Handles the click event on a square.
   * @function
   * @name handleSquareClick
   * @returns {void}
   */
  function handleSelectSquare(rowIndex, cellIndex) {
   setGameTurns((prevGameTurns) => {
      const currentPlayer = deriveActivePlayer(prevGameTurns);
      return [
        { square: { row: rowIndex, cell: cellIndex }, player: currentPlayer },
        ...prevGameTurns,
      ];
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
          />
          <Player
            initialName="Player 2"
            symbol="O"
            isActive={activePlayer === "O"}
          />
        </ol>
        <GameBoard
          onSelectSquare={handleSelectSquare}
          turns={gameTurns}
        />
      </div>
      <Log turns={gameTurns} />
    </main>
  );
}

export default App;
