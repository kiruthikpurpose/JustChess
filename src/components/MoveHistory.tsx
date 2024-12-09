import React from 'react';
import { Move } from '../types/chess';

interface MoveHistoryProps {
  moves: Move[];
}

const MoveHistory: React.FC<MoveHistoryProps> = ({ moves }) => {
  const getNotation = (move: Move): string => {
    const cols = 'abcdefgh';
    const from = `${cols[move.from.col]}${8 - move.from.row}`;
    const to = `${cols[move.to.col]}${8 - move.to.row}`;
    return `${move.piece.type.charAt(0).toUpperCase()}${from}-${to}${move.captured ? ' x' : ''}`;
  };

  return (
    <div className="bg-gray-800 p-4 rounded-lg h-[400px] overflow-y-auto">
      <h2 className="text-xl font-bold mb-4 text-white">Move History</h2>
      <div className="space-y-2">
        {moves.map((move, index) => (
          <div key={index} className="text-gray-300 flex items-center space-x-2">
            <span className="text-gray-500">{Math.floor(index / 2) + 1}.</span>
            <span>{getNotation(move)}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MoveHistory;