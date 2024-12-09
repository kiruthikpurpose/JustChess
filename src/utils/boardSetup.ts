import { Piece } from '../types/chess';

export const createInitialBoard = (): (Piece | null)[][] => {
  const board: (Piece | null)[][] = Array(8).fill(null).map(() => Array(8).fill(null));

  // Place pawns
  for (let i = 0; i < 8; i++) {
    board[1][i] = { type: 'pawn', color: 'black' };
    board[6][i] = { type: 'pawn', color: 'white' };
  }

  // Place other pieces
  const pieces: ('rook' | 'knight' | 'bishop' | 'queen' | 'king')[] = ['rook', 'knight', 'bishop', 'queen', 'king', 'bishop', 'knight', 'rook'];
  pieces.forEach((piece, i) => {
    board[0][i] = { type: piece, color: 'black' };
    board[7][i] = { type: piece, color: 'white' };
  });

  return board;
};