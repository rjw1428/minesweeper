export interface Cell {
  hasMine: boolean;
  isRevealed: boolean;
  isFlagged: boolean;
  adjacentMines: number;
  isIncorrectlyFlagged?: boolean; // Added for incorrect flags
}