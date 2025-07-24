import { GameState } from '../models/enums';
import { GameService } from './game.service';

describe('GameService', () => {
  let service: GameService;

  beforeEach(() => {
    service = new GameService();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should initialize the board with correct dimensions', () => {
    const board = service.getBoard();
    expect(board.length).toBe(10);
    expect(board[0].length).toBe(10);
  });

  it('should place the correct number of mines', () => {
    const board = service.getBoard();
    let mineCount = 0;
    for (let r = 0; r < 10; r++) {
      for (let c = 0; c < 10; c++) {
        if (board[r][c].hasMine) {
          mineCount++;
        }
      }
    }
    expect(mineCount).toBe(15);
  });

  it('should reveal a cell', () => {
    const board = service.getBoard();
    service.revealCell(0, 0);
    expect(board[0][0].isRevealed).toBe(true);
  });

  it('should flag a cell', () => {
    const board = service.getBoard();
    service.flagCell(0, 0);
    expect(board[0][0].isFlagged).toBe(true);
  });

  it('should not reveal a flagged cell', () => {
    const board = service.getBoard();
    service.flagCell(0, 0);
    service.revealCell(0, 0);
    expect(board[0][0].isRevealed).toBe(false);
  });

  it('should set game state to Lost when a mine is revealed', () => {
    const board = service.getBoard();
    // Find a mine and reveal it
    let mineFound = false;
    for (let r = 0; r < 10; r++) {
      for (let c = 0; c < 10; c++) {
        if (board[r][c].hasMine) {
          service.revealCell(r, c);
          mineFound = true;
          break;
        }
      }
      if (mineFound) break;
    }
    expect(service.getGameState()).toBe(GameState.Lost);
  });

  it('should set game state to Won when all non-mine cells are revealed', () => {
    const board = service.getBoard();
    // Reveal all non-mine cells
    for (let r = 0; r < 10; r++) {
      for (let c = 0; c < 10; c++) {
        if (!board[r][c].hasMine) {
          service.revealCell(r, c);
        }
      }
    }
    expect(service.getGameState()).toBe(GameState.Won);
  });

  it('should reset the game', () => {
    service.revealCell(0, 0);
    service.resetGame();
    const board = service.getBoard();
    expect(board[0][0].isRevealed).toBe(false);
    expect(service.getGameState()).toBe(GameState.InProgress);
  });
});