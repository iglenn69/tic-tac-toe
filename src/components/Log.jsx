export default function Log({ turns }) {  
  return <ol id="log">
    {turns.map((turn) => {
      const { square, player } = turn;
      const { row, cell } = square;
      return <li key={`${turn.square.row}${turn.square.cell}`}>{`Player ${player} selected row ${row} cell ${cell}`}</li>;
    })}
  </ol>;
}
