import { Component, OnInit, signal, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GameService, Cell, GameState } from '../game';
import { ColumnLetterPipe } from '../column-letter-pipe';

@Component({
  selector: 'app-board',
  standalone: true,
  imports: [CommonModule, ColumnLetterPipe],
  templateUrl: './board.html',
  styleUrl: './board.css'
})
export class BoardComponent implements OnInit {
  board: Cell[][] = [];
  gameState!: GameState;
  flagsRemaining = signal(0);
  percentCompleted = signal(0);

  constructor(private gameService: GameService) {
    effect(() => {
      this.flagsRemaining.set(this.gameService.getFlagsRemaining());
      this.percentCompleted.set(this.gameService.percentCompleted());
    });
  }

  ngOnInit() {
    this.board = this.gameService.getBoard();
    this.gameState = this.gameService.getGameState();
    this.flagsRemaining.set(this.gameService.getFlagsRemaining());
    this.percentCompleted.set(this.gameService.percentCompleted());
  }

  get GameState() {
    return GameState;
  }

  revealCell(row: number, col: number) {
    this.gameService.revealCell(row, col);
    this.gameState = this.gameService.getGameState();
  }

  flagCell(event: MouseEvent, row: number, col: number) {
    event.preventDefault();
    this.gameService.flagCell(row, col);
    this.flagsRemaining.set(this.gameService.getFlagsRemaining());
  }

  resetGame() {
    this.gameService.resetGame();
    this.board = this.gameService.getBoard();
    this.gameState = this.gameService.getGameState();
    this.flagsRemaining.set(this.gameService.getFlagsRemaining());
  }
}