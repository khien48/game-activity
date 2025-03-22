import { useContext, useEffect } from "react";
import { GameContext } from "./App"; // Import context from App
import { Button } from "./components/ui/button";
import "./styles.css"; // Import styles

function Board({ gameMode, setScreen }) {
  const { board, setBoard, turn, setTurn, winner, checkWinner, aiMove } = useContext(GameContext);

  useEffect(() => {
    if (gameMode === "ai" && turn === "O" && !winner) {
      aiMove();
    }
  }, [turn, winner]);

  return (
    <div className="board-container">
      <h2 className="status">{winner ? `Winner: ${winner}` : `Turn: ${turn}`}</h2>
      <div className="board">
        {board.map((cell, i) => (
          <button
            key={i}
            className="cell"
            onClick={() => {
              if (!cell && !winner) {
                const newBoard = [...board];
                newBoard[i] = turn;
                setBoard(newBoard);
                checkWinner(newBoard);
                setTurn(turn === "X" ? "O" : "X");
              }
            }}
          >
            {cell}
          </button>
        ))}
      </div>
      {winner && <Button onClick={() => setScreen("menu")}>Back to Menu</Button>}
    </div>
  );
}

export default Board;
