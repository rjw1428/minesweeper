export interface Cell {
  hasMine: boolean;
  isRevealed: boolean;
  isFlagged: boolean;
  adjacentMines: number;
  isIncorrectlyFlagged?: boolean;
}

export interface BoardConfig {
  rows: number;
  columns: number;
  mines: number;
}