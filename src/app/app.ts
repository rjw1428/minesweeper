import { Component, signal } from '@angular/core';
import { BoardComponent } from './board/board';

@Component({
  selector: 'app-root',
  imports: [BoardComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('minesweeper-ui');
}
