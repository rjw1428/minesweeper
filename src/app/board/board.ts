import { Component, OnInit, signal, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Cell } from '../models/models';
import { ColumnLetterPipe } from '../utils/column-letter-pipe';
import { GameService } from '../services/game.service';
import { GameState } from '../models/enums';

@Component({
  selector: 'app-board',
  standalone: true,
  imports: [CommonModule, ColumnLetterPipe],
  templateUrl: './board.html',
  styleUrl: './board.css'
})
export class BoardComponent implements OnInit {
  board: Cell[][] = [];
  gameState: GameState = GameState.InProgress;
  flagsRemaining = signal(0);
  percentCompleted = signal(0);

  readonly GameState = GameState;

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