import React, { useState, useEffect } from "react";
import circle_icon from "../assets/circle.png";
import cross_icon from "../assets/cross.png";
import "./Maingame.css";

const Maingame = () => {
  const [data, setData] = useState(Array(9).fill(""));
  const [currentPlayer, setCurrentPlayer] = useState("x");
  const [winner, setWinner] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    checkWin();
  }, [data]);

  const checkWin = () => {
    const winPatterns = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8], // Rows
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8], // Columns
      [0, 4, 8],
      [2, 4, 6], // Diagonals
    ];

    for (let pattern of winPatterns) {
      const [a, b, c] = pattern;
      if (data[a] && data[a] === data[b] && data[a] === data[c]) {
        setWinner(data[a]);
        return;
      }
    }

    if (data.every((cell) => cell !== "")) {
      setWinner("draw");
    }
  };

  const handleCellClick = (index) => {
    if (winner) return;

    if (data[index] === "") {
      const newData = [...data];
      newData[index] = currentPlayer;
      setData(newData);
      setCurrentPlayer(currentPlayer === "x" ? "o" : "x");
      setError(null);
    } else {
      setError("This cell is already occupied. Choose an empty cell.");
    }
  };

  const quit = () => {
    setWinner(currentPlayer === "x" ? "o" : "x");
  };

  const reset = () => {
    setData(Array(9).fill(""));
    setCurrentPlayer("x");
    setWinner(null);
    setError(null);
  };

  return (
    <div className="container">
      <h1 className="title">Tic-Tac-Toe</h1>
      <div className="board">
        {data.map((cell, index) => (
          <div
            key={index}
            className="cell"
            onClick={() => handleCellClick(index)}
          >
            {cell && (
              <img src={cell === "x" ? cross_icon : circle_icon} alt={cell} />
            )}
          </div>
        ))}
      </div>
      {error && <div className="error">{error}</div>}
      {winner ? (
        <div className="winner">
          {winner === "draw"
            ? "It's a draw!"
            : `Player ${winner.toUpperCase()} wins!`}
        </div>
      ) : (
        <div className="current-player">
          Current player: {currentPlayer.toUpperCase()}
        </div>
      )}
      <button onClick={quit}>Quit</button>
      <button onClick={reset}>Reset</button>
    </div>
  );
};

export default Maingame;
