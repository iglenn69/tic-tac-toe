import { useState } from "react";
import Player from "./components/Player";
import GameBoard from "./components/GameBoard";
import Log from "./components/Log";

function App() {
  const [activePlayer, setActivePlayer] = useState("X");
  const [gameTurns, setGameTurns] = useState([]);

  /**
   * Handles the click event on a square.
   * @function
   * @name handleSquareClick
   * @returns {void}
   */
  function handleSquareClick(rowIndex, cellIndex) {
    setActivePlayer((currentActivePlayer) =>
      currentActivePlayer === "X" ? "O" : "X"
    );
    setGameTurns((prevGameTurns) => {
      let currentPlayer = "X";
      if (prevGameTurns.length > 0) {
        currentPlayer = prevGameTurns[0].player === "X" ? "O" : "X";
      }
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
          onSelectSquare={handleSquareClick}
          turns={gameTurns}
        />
      </div>
      <Log />
    </main>
  );
}

export default App;
