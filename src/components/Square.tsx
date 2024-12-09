import React from 'react';
import { Piece } from '../types/chess';

interface SquareProps {
  piece: Piece | null;
  isBlack: boolean;
  isSelected: boolean;
  isValidMove: boolean;
  onClick: () => void;
}

const Square: React.FC<SquareProps> = ({ piece, isBlack, isSelected, isValidMove, onClick }) => {
  const getPieceSymbol = (piece: Piece): string => {
    const symbols: Record<string, { white: string; black: string }> = {
      king: { white: '♔', black: '♚' },
      queen: { white: '♕', black: '♛' },
      rook: { white: '♖', black: '♜' },
      bishop: { white: '♗', black: '♝' },
      knight: { white: '♘', black: '♞' },
      pawn: { white: '♙', black: '♟' },
    };
    return symbols[piece.type][piece.color];
  };

  return (
    <div
      onClick={onClick}
      className={`
        w-14 h-14 flex items-center justify-center text-4xl cursor-pointer
        transition-all duration-200 relative border border-gray-800
        ${isBlack ? 'bg-gray-800' : 'bg-gray-600'}
        ${isSelected ? 'ring-2 ring-blue-400 ring-inset' : ''}
        ${isValidMove ? 'after:absolute after:w-3 after:h-3 after:bg-blue-400 after:rounded-full after:opacity-50' : ''}
        hover:brightness-110
      `}
    >
      {piece && (
        <span 
          className={`
            select-none transform transition-transform duration-200 
            ${piece.color === 'white' ? 'text-gray-100' : 'text-gray-900'}
            ${isSelected ? 'scale-110' : ''}
          `}
        >
          {getPieceSymbol(piece)}
        </span>
      )}
    </div>
  );
};

export default Square;