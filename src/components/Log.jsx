export default function Log({ turns }) {  
  return <ol id="log">
    {turns.map((turn) => {
      const { square, player } = turn;
      const { row, col } = square;
      return <li key={`${turn.square.row}${turn.square.col}`}>{`Player ${player} selected row ${row} cell ${col}`}</li>;
    })}
  </ol>;
}
