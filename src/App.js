import React, { useState } from 'react';
import './App.css';

function App() {
  const [player1Name, setPlayer1Name] = useState('');
  const [player2Name, setPlayer2Name] = useState('');
  const [board, setBoard] = useState(Array(9).fill(''));
  const [currentPlayer, setCurrentPlayer] = useState('X');
  const [winner, setWinner] = useState('');
  const [player1Wins, setPlayer1Wins] = useState(0);
  const [player2Wins, setPlayer2Wins] = useState(0);
  const [draws, setDraws] = useState(0);
  const [gameStarted, setGameStarted] = useState(false);

  const handlePlayerNameChange = (player, event) => {
    const playerName = event.target.value;
    if (player === 'player1') {
      setPlayer1Name(playerName);
    } else if (player === 'player2') {
      setPlayer2Name(playerName);
    }
  };

  const handleStartGame = () => {
    if (player1Name && player2Name) {
      setGameStarted(true);
      setBoard(Array(9).fill(''));
      setCurrentPlayer('X');
      setWinner('');
    }
  };

  const makeMove = (index) => {
    if (board[index] === '' && !winner) {
      const updatedBoard = [...board];
      updatedBoard[index] = currentPlayer;
      setBoard(updatedBoard);
      setCurrentPlayer(currentPlayer === 'X' ? 'O' : 'X');
      checkWin(updatedBoard);
    }
  };

  const checkWin = (board) => {
    const winningCombinations = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
      [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
      [0, 4, 8], [2, 4, 6] // diagonals
    ];

    for (const combination of winningCombinations) {
      const [a, b, c] = combination;
      if (board[a] === board[b] && board[b] === board[c] && board[a] !== '') {
        setWinner(board[a]);
        updateScore(board[a]);
        return;
      }
    }

    if (board.every(cell => cell !== '')) {
      setWinner('draw');
      setDraws(prevDraws => prevDraws + 1);
    }
  };

  const updateScore = (player) => {
    if (player === 'X') {
      setPlayer1Wins(prevWins => prevWins + 1);
    } else {
      setPlayer2Wins(prevWins => prevWins + 1);
    }
  };

  const handleReset = () => {
    setPlayer1Name('');
    setPlayer2Name('');
    setPlayer1Wins(0);
    setPlayer2Wins(0);
    setDraws(0);
    setBoard(Array(9).fill(''));
    setCurrentPlayer('X');
    setWinner('');
    setGameStarted(false);
  };

  return (
    <div className="App">
      {!gameStarted ? (
        <div className="player-names">
          <h1>Tic Tac Toe</h1>
          <div className="player">
            <label>Player 1 Name:</label>
            <input
              type="text"
              value={player1Name}
              onChange={(e) => handlePlayerNameChange('player1', e)}
            />
          </div>
          <div className="player">
            <label>Player 2 Name:</label>
            <input
              type="text"
              value={player2Name}
              onChange={(e) => handlePlayerNameChange('player2', e)}
            />
          </div>
          <button onClick={handleStartGame}>Start Game</button>
        </div>
      ) : (
        <>
          <h1>Tic Tac Toe</h1>
          <div className="board">
            {board.map((cell, index) => (
              <div
                key={index}
                className="cell"
                onClick={() => makeMove(index)}
              >
                {cell}
              </div>
            ))}
          </div>
          {winner && (
            <div className="result">
              <div>
                {winner === 'draw' ? 'It\'s a draw!' : `${winner === 'X' ? player1Name : player2Name} wins!`}
              </div>
              <div>
                <button onClick={handleStartGame}>Play Again</button>
                <button onClick={handleReset}>Reset</button>
              </div>
            </div>
          )}
          <div className="score">
            <div>
              {player1Name}: {player1Wins} wins
            </div>
            <div>
              {player2Name}: {player2Wins} wins
            </div>
            <div>
              Draws: {draws}
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default App;
