import { Piece, Position, PieceType } from '../types/chess';

const isPathClear = (from: Position, to: Position, board: (Piece | null)[][]): boolean => {
  const dx = Math.sign(to.col - from.col);
  const dy = Math.sign(to.row - from.row);
  let x = from.col + dx;
  let y = from.row + dy;

  while (x !== to.col || y !== to.row) {
    if (board[y][x] !== null) return false;
    x += dx;
    y += dy;
  }

  return true;
};

const isWithinBoard = (pos: Position): boolean => {
  return pos.row >= 0 && pos.row < 8 && pos.col >= 0 && pos.col < 8;
};

const canCapture = (piece: Piece, target: Piece | null): boolean => {
  return target === null || target.color !== piece.color;
};

export const isValidMove = (
  piece: Piece,
  from: Position,
  to: Position,
  board: (Piece | null)[][]
): boolean => {
  if (!isWithinBoard(to)) return false;
  if (!canCapture(piece, board[to.row][to.col])) return false;
  
  const dx = to.col - from.col;
  const dy = to.row - from.row;
  const absDx = Math.abs(dx);
  const absDy = Math.abs(dy);

  switch (piece.type) {
    case 'pawn': {
      const direction = piece.color === 'white' ? -1 : 1;
      const startRow = piece.color === 'white' ? 6 : 1;
      const targetPiece = board[to.row][to.col];

      // Forward movement
      if (dx === 0 && !targetPiece) {
        if (dy === direction) return true;
        if (from.row === startRow && dy === 2 * direction) {
          return isPathClear(from, to, board);
        }
      }

      // Capture movement
      if (absDx === 1 && dy === direction && targetPiece && targetPiece.color !== piece.color) {
        return true;
      }

      return false;
    }

    case 'rook':
      return (dx === 0 || dy === 0) && isPathClear(from, to, board);

    case 'knight':
      return (absDx === 2 && absDy === 1) || (absDx === 1 && absDy === 2);

    case 'bishop':
      return absDx === absDy && isPathClear(from, to, board);

    case 'queen':
      return (absDx === absDy || dx === 0 || dy === 0) && isPathClear(from, to, board);

    case 'king':
      return absDx <= 1 && absDy <= 1;

    default:
      return false;
  }
};