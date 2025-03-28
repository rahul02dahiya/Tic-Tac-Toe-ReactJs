
import { useState } from 'react';
import './App.css';

function Square({value, onSquareClick, winner}) {

  return <button onClick={onSquareClick} className={`square ${winner ? "winner-squares" : ""}`}>{value}</button>;
}

function checkWinner(squareVal) {
  const winners = [
    [0,1,2],[3,4,5],[6,7,8],
    [0,3,6],[1,4,7],[2,5,8],
    [0,4,8],[2,4,6]
  ];
  for(let [a,b,c] of winners){
    if (squareVal[a] && squareVal[a]===squareVal[b] && squareVal[a]===squareVal[c]) {
      return {winner:squareVal[a],winningSquares:[a,b,c]};
    }
  }
  return null;
}

function App() {

  const [squareVal, setSquareVal] = useState(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(true);
  const squareCopy = squareVal.slice();

  function handleClick(i) {

    if(squareVal[i] || checkWinner(squareVal)) return;

    squareCopy[i] = isXNext?"X":"O";
    setSquareVal(squareCopy);
    setIsXNext(!isXNext);
  }

  const winnerData = checkWinner(squareVal);
  const winner = winnerData?.winner;
  const winningSquares = winnerData?.winningSquares || [];
  let status;

  if (winner) {
    status = "Winner " + winner;
  }
  else{
    status = "Next Turn" + (isXNext?"X":"O");
  }

  function reset() {
    setSquareVal(Array(9).fill(null));
  }

  return (
    <div className="App">
      <div className="panel">
      <h1 className='status'>{status}</h1>
      <span><button className='reset-btn' onClick={reset}>Reset</button></span>
      </div>
     
      <div id="board">

        {
          squareVal.map((value,i)=>(
            <Square value={value} onSquareClick={() => handleClick(i)} winner={winningSquares.includes(i)}/>
          ))
        }
      
      </div>
    </div>
  );
}

export default App;
