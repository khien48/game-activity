import { useState, createContext } from "react";
import { Button } from "./components/ui/button";
import Board from "./Board"; // Import Board from separate file
import "./styles.css"; // Import CSS styles

export const GameContext = createContext(null); // Export context

function MainMenu({ setScreen }) {
  return (
    <div className="menu">
      <h1 className="title">Tic Tac Toe</h1>
      <Button onClick={() => setScreen("pvp")}>Play PvP</Button>
      <Button onClick={() => setScreen("ai")}>Play vs AI</Button>
    </div>
  );
}

function App() {
  const [screen, setScreen] = useState("menu");
  const [board, setBoard] = useState(Array(9).fill(null));
  const [turn, setTurn] = useState("X");
  const [winner, setWinner] = useState(null);

  const checkWinner = (board) => {
    const winPatterns = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8],
      [0, 3, 6], [1, 4, 7], [2, 5, 8],
      [0, 4, 8], [2, 4, 6]
    ];
    for (let pattern of winPatterns) {
      const [a, b, c] = pattern;
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        setWinner(board[a]);
        return;
      }
    }
    if (!board.includes(null)) setWinner("Draw");
  };

  const aiMove = () => {
    const emptyCells = board.map((cell, i) => (cell === null ? i : null)).filter(i => i !== null);
    if (emptyCells.length > 0) {
      const randomMove = emptyCells[Math.floor(Math.random() * emptyCells.length)];
      setTimeout(() => {
        const newBoard = [...board];
        newBoard[randomMove] = "O";
        setBoard(newBoard);
        checkWinner(newBoard);
        setTurn("X");
      }, 500);
    }
  };

  return (
    <GameContext.Provider value={{ board, setBoard, turn, setTurn, winner, checkWinner, aiMove }}>
      <div className="app-container">
        {screen === "menu" && <MainMenu setScreen={setScreen} />}
        {(screen === "pvp" || screen === "ai") && <Board gameMode={screen} setScreen={setScreen} />}
      </div>
    </GameContext.Provider>
  );
}

export default App;
