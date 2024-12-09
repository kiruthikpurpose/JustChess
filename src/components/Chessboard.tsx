import React from 'react';
import Square from './Square';
import { Piece, Position } from '../types/chess';
import { isValidMove } from '../utils/chessRules';

interface ChessboardProps {
  board: (Piece | null)[][];
  selectedSquare: Position | null;
  currentPlayer: 'white' | 'black';
  onSquareClick: (position: Position) => void;
}

const Chessboard: React.FC<ChessboardProps> = ({
  board,
  selectedSquare,
  currentPlayer,
  onSquareClick,
}) => {
  const isValidMoveHighlight = (pos: Position): boolean => {
    if (!selectedSquare) return false;
    const piece = board[selectedSquare.row][selectedSquare.col];
    if (!piece) return false;
    return isValidMove(piece, selectedSquare, pos, board);
  };

  return (
    <div className="inline-block bg-gray-900 p-4 rounded-xl shadow-2xl">
      <div className="grid grid-cols-8 gap-0 border-4 border-gray-700 rounded-lg overflow-hidden">
        {board.map((row, rowIndex) =>
          row.map((piece, colIndex) => (
            <Square
              key={`${rowIndex}-${colIndex}`}
              piece={piece}
              isBlack={(rowIndex + colIndex) % 2 === 1}
              isSelected={
                selectedSquare?.row === rowIndex && selectedSquare?.col === colIndex
              }
              isValidMove={isValidMoveHighlight({ row: rowIndex, col: colIndex })}
              onClick={() => onSquareClick({ row: rowIndex, col: colIndex })}
            />
          ))
        )}
      </div>
      <div className="flex justify-between mt-2 text-gray-400 text-sm">
        <div>a b c d e f g h</div>
        <div className="text-right">8 7 6 5 4 3 2 1</div>
      </div>
    </div>
  );
};

export default Chessboard;