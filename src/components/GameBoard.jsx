import { useState } from "react";

const initialGameBoard = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];

export default function GameBoard({ onSelectSquare, activePlayerSymbol }) {
  const [gameBoard, setGameBoard] = useState(initialGameBoard);

  /**
   * Updates the game board with an "X" at the specified row and cell index.
   * @param {number} rowIndex - The index of the row to update.
   * @param {number} cellIndex - The index of the cell to update.
   */
  function handleSelectSquare(rowIndex, cellIndex) {
    // TODO: Update the game board at the specified row and cell index with an "X" in an immutable way.
    setGameBoard((prevGameBoard) => {
      const updatedGameBoard = [...prevGameBoard.map((row) => [...row])];
      updatedGameBoard[rowIndex][cellIndex] = activePlayerSymbol;
      return updatedGameBoard;
    });
    onSelectSquare();
  }

  return (
    <ol id="game-board">
      {gameBoard.map((row, rowIndex) => {
        return (
          <li key={rowIndex}>
            <ol>
              {row.map((playerSymbol, cellIndex) => {
                return (
                  <li key={cellIndex}>
                    <button
                      onClick={() => handleSelectSquare(rowIndex, cellIndex)}
                    >
                      {playerSymbol}
                    </button>
                  </li>
                );
              })}
            </ol>
          </li>
        );
      })}
    </ol>
  );
}
