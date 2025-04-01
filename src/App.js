
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
  const [history, sethistory] = useState([Array(9).fill(null)]);
  const [isXNext, setIsXNext] = useState(true);
  const [currentStep, setcurrentStep] = useState(0);
  const currentSquares = squareVal.slice();

  function handleClick(i) {

    if(squareVal[i] || checkWinner(squareVal)) return;

    currentSquares[i] = isXNext?"X":"O";
    setSquareVal(currentSquares);
    sethistory([...history.slice(0,currentStep),currentSquares]);
    setIsXNext(!isXNext);
    setcurrentStep(currentStep+1);
  }

  const winnerData = checkWinner(squareVal);
  const winner = winnerData?.winner;
  const winningSquares = winnerData?.winningSquares || [];
  let status;

  if (winner) {
    status = "Winner " + winner;
    console.log(history);
  }
  else{
    status = "Next Turn" + (isXNext?"X":"O");
  }

  function reset() {
    setSquareVal(Array(9).fill(null));
    setcurrentStep(0);
  }

  function moveBackward() {
    if(currentStep>=0){
      setSquareVal(history[currentStep-1]);
      setcurrentStep(currentStep-1);
  }
  }

  function moveForward() {
    if(currentStep<history.length-1){
      setSquareVal(history[currentStep+1]);
      setcurrentStep(currentStep+1);
    }
  }

  return (
    <div className="App">
      <div className="panel">
        <h1>{currentStep}</h1>
      <h1 className='status'>{status}</h1>
      <span><button className='reset-btn btn' onClick={reset}>Reset</button></span>
      <span><button onClick={moveBackward} className='history-btn btn'>&lt;</button></span>
      <span><button onClick={moveForward} className='history-btn btn'>&gt;</button></span>
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
