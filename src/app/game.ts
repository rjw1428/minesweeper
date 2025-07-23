import { Injectable } from '@angular/core';

export interface Cell {
  hasMine: boolean;
  isRevealed: boolean;
  isFlagged: boolean;
  adjacentMines: number;
}

export enum GameState {
  InProgress,
  Won,
  Lost
}

@Injectable({
  providedIn: 'root'
})
export class GameService {
  private board: Cell[][] = [];
  private flagsPlaced: number = 0;
  private readonly rows = 10;
  private readonly cols = 10;
  private readonly mines = 15;
  private gameState: GameState = GameState.InProgress;

  constructor() {
    this.initializeBoard();
  }

  private initializeBoard(): void {
    this.gameState = GameState.InProgress;
    // Initialize the board with empty cells
    for (let r = 0; r < this.rows; r++) {
      this.board[r] = [];
      for (let c = 0; c < this.cols; c++) {
        this.board[r][c] = {
          hasMine: false,
          isRevealed: false,
          isFlagged: false,
          adjacentMines: 0
        };
      }
    }

    // Randomly place mines
    let minesPlaced = 0;
    while (minesPlaced < this.mines) {
      const r = Math.floor(Math.random() * this.rows);
      const c = Math.floor(Math.random() * this.cols);
      if (!this.board[r][c].hasMine) {
        this.board[r][c].hasMine = true;
        minesPlaced++;
      }
    }

    // Calculate adjacent mines for each cell
    for (let r = 0; r < this.rows; r++) {
      for (let c = 0; c < this.cols; c++) {
        if (!this.board[r][c].hasMine) {
          this.board[r][c].adjacentMines = this.calculateAdjacentMines(r, c);
        }
      }
    }
  }

  private calculateAdjacentMines(row: number, col: number): number {
    let count = 0;
    for (let r = -1; r <= 1; r++) {
      for (let c = -1; c <= 1; c++) {
        const newRow = row + r;
        const newCol = col + c;
        if (newRow >= 0 && newRow < this.rows && newCol >= 0 && newCol < this.cols) {
          if (this.board[newRow][newCol].hasMine) {
            count++;
          }
        }
      }
    }
    return count;
  }

  getBoard(): Cell[][] {
    return this.board;
  }

  getGameState(): GameState {
    return this.gameState;
  }

  revealCell(row: number, col: number): void {
    const cell = this.board[row][col];

    if (cell.isRevealed || cell.isFlagged || this.gameState !== GameState.InProgress) {
      return;
    }

    cell.isRevealed = true;

    if (cell.hasMine) {
      this.gameState = GameState.Lost;
      console.log('Game Over');
      return;
    }

    if (cell.adjacentMines === 0) {
      // Reveal adjacent cells
      for (let r = -1; r <= 1; r++) {
        for (let c = -1; c <= 1; c++) {
          const newRow = row + r;
          const newCol = col + c;
          if (newRow >= 0 && newRow < this.rows && newCol >= 0 && newCol < this.cols) {
            this.revealCell(newRow, newCol);
          }
        }
      }
    }
    this.checkWinCondition();
  }

  flagCell(row: number, col: number): void {
    const cell = this.board[row][col];
    if (!cell.isRevealed && this.gameState === GameState.InProgress) {
      cell.isFlagged = !cell.isFlagged;
      if (cell.isFlagged) {
        this.flagsPlaced++;
      } else {
        this.flagsPlaced--;
      }
    }
  }

  resetGame(): void {
    this.flagsPlaced = 0;
    this.initializeBoard();
  }

  getFlagsRemaining(): number {
    return this.mines - this.flagsPlaced;
  }

  private checkWinCondition(): void {
    let revealedCells = 0;
    for (let r = 0; r < this.rows; r++) {
      for (let c = 0; c < this.cols; c++) {
        if (this.board[r][c].isRevealed) {
          revealedCells++;
        }
      }
    }

    if (revealedCells === this.rows * this.cols - this.mines) {
      this.gameState = GameState.Won;
      console.log('You Won!');
    }
  }
}
