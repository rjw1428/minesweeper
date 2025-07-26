import { Injectable, signal, Inject } from '@angular/core';
import { Cell } from '../models/models';
import { GameState } from '../models/enums';
import { BoardConfig, BOARD_CONFIG } from '../app.config';

@Injectable({
  providedIn: 'root'
})
export class GameService {
  private board: Cell[][] = [];
  private flagsPlaced = 0;
  private readonly rows: number;
  private readonly cols: number;
  private readonly mines: number;
  private gameState: GameState = GameState.InProgress;
  public percentCompleted = signal(0);

  constructor(@Inject(BOARD_CONFIG) private boardConfig: BoardConfig) {
    this.rows = this.boardConfig.rows;
    this.cols = this.boardConfig.columns;
    this.mines = this.boardConfig.mines;
    this.initializeBoard();
  }

  private initializeBoard(): void {
    this.gameState = GameState.InProgress;

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
    this.updatePercentCompleted();
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
      this.revealAllMines();
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
    this.updatePercentCompleted();
  }

  flagCell(row: number, col: number): void {
    const cell = this.board[row][col];
    if (!cell.isRevealed && this.gameState === GameState.InProgress) {
      if (!cell.isFlagged && this.flagsPlaced < this.mines) {
        cell.isFlagged = true;
        this.flagsPlaced++;
      } else if (cell.isFlagged) {
        cell.isFlagged = false;
        this.flagsPlaced--;
      }
    }
    this.updatePercentCompleted();
  }

  resetGame(): void {
    this.flagsPlaced = 0;
    this.initializeBoard();
    this.updatePercentCompleted();
  }

  getFlagsRemaining(): number {
    return this.mines - this.flagsPlaced;
  }

  private checkWinCondition(): void {
    let revealedCells = 0;
    for (let r = 0; r < this.rows; r++) {
      for (let c = 0; c < this.cols; c++) {
        if (this.board[r][c].isRevealed && !this.board[r][c].hasMine) {
          revealedCells++;
        }
      }
    }

    if (revealedCells === this.rows * this.cols - this.mines) {
      this.gameState = GameState.Won;
      console.log('You Won!');
    }
  }

  private updatePercentCompleted(): void {
    let revealedNonMineCells = 0;
    let totalNonMineCells = this.rows * this.cols - this.mines;

    for (let r = 0; r < this.rows; r++) {
      for (let c = 0; c < this.cols; c++) {
        if (this.board[r][c].isRevealed && !this.board[r][c].hasMine) {
          revealedNonMineCells++;
        }
      }
    }
    this.percentCompleted.set(totalNonMineCells > 0 ? Math.floor((revealedNonMineCells / totalNonMineCells) * 100) : 0);
  }

  private revealAllMines(): void {
    for (let r = 0; r < this.rows; r++) {
      for (let c = 0; c < this.cols; c++) {
        const cell = this.board[r][c];
        if (cell.hasMine && !cell.isFlagged) {
          cell.isRevealed = true;
        } else if (!cell.hasMine && cell.isFlagged) {
          cell.isIncorrectlyFlagged = true;
        }
      }
    }
  }
}
