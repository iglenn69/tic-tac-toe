const initialGameBoard = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];

export default function GameBoard({ onSelectSquare, turns }) {
  let gameBoard = initialGameBoard;
  turns.forEach((turn) => {
    const { square, player } = turn;
    const { row, cell } = square;
    gameBoard[row][cell] = player;
  });
  //   const [gameBoard, setGameBoard] = useState(initialGameBoard);

  //   /**
  //    * Updates the game board with an "X" at the specified row and cell index.
  //    * @param {number} rowIndex - The index of the row to update.
  //    * @param {number} cellIndex - The index of the cell to update.
  //    */
  //   function handleSelectSquare(rowIndex, cellIndex) {
  //     setGameBoard((prevGameBoard) => {
  //       const updatedGameBoard = [...prevGameBoard.map((row) => [...row])];
  //       updatedGameBoard[rowIndex][cellIndex] = activePlayerSymbol;
  //       return updatedGameBoard;
  //     });
  //     onSelectSquare();
  //   }

  return (
    <ol id="game-board">
      {gameBoard.map((row, rowIndex) => {
        return (
          <li key={rowIndex}>
            <ol>
              {row.map((playerSymbol, cellIndex) => {
                return (
                  <li key={cellIndex}>
                    <button onClick={() => onSelectSquare(rowIndex, cellIndex)}>{playerSymbol}</button>
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
