import React, { useState } from 'react';
import { RotateCcw } from 'lucide-react';
import Chessboard from './components/Chessboard';
import MoveHistory from './components/MoveHistory';
import { Piece, Position, Move } from './types/chess';
import { createInitialBoard } from './utils/boardSetup';
import { isValidMove } from './utils/chessRules';

function App() {
  const [board, setBoard] = useState<(Piece | null)[][]>(createInitialBoard());
  const [selectedSquare, setSelectedSquare] = useState<Position | null>(null);
  const [currentPlayer, setCurrentPlayer] = useState<'white' | 'black'>('white');
  const [moves, setMoves] = useState<Move[]>([]);

  const handleSquareClick = (position: Position) => {
    if (!selectedSquare) {
      const piece = board[position.row][position.col];
      if (piece && piece.color === currentPlayer) {
        setSelectedSquare(position);
      }
    } else {
      const piece = board[selectedSquare.row][selectedSquare.col];
      if (piece && isValidMove(piece, selectedSquare, position, board)) {
        const newBoard = board.map(row => [...row]);
        const capturedPiece = newBoard[position.row][position.col];
        
        // Move piece
        newBoard[position.row][position.col] = piece;
        newBoard[selectedSquare.row][selectedSquare.col] = null;
        
        // Record move
        setMoves([...moves, {
          from: selectedSquare,
          to: position,
          piece: piece,
          captured: capturedPiece || undefined
        }]);
        
        setBoard(newBoard);
        setCurrentPlayer(currentPlayer === 'white' ? 'black' : 'white');
      }
      setSelectedSquare(null);
    }
  };

  const resetGame = () => {
    setBoard(createInitialBoard());
    setSelectedSquare(null);
    setCurrentPlayer('white');
    setMoves([]);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold">JustChess</h1>
          <button
            onClick={resetGame}
            className="flex items-center gap-2 px-4 py-2 bg-gray-700 rounded-lg hover:bg-gray-600 transition-colors"
          >
            <RotateCcw size={20} />
            Reset Game
          </button>
        </div>
        
        <div className="flex gap-8 items-start">
          <div className="flex-1">
            <div className="mb-4 text-xl font-semibold text-blue-400">
              {currentPlayer === 'white' ? "White's Turn" : "Black's Turn"}
            </div>
            <Chessboard
              board={board}
              selectedSquare={selectedSquare}
              currentPlayer={currentPlayer}
              onSquareClick={handleSquareClick}
            />
          </div>
          <div className="w-80">
            <MoveHistory moves={moves} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;