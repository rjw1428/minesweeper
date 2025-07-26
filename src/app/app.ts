import { Component, OnInit } from '@angular/core';
import { BoardComponent } from './board/board';

@Component({
  selector: 'app-root',
  imports: [BoardComponent],
  template: `
    <div class="container">
    <h1>Minesweeper</h1>
    <app-board></app-board>
    <div class="dark-mode-toggle">
      <label for="darkModeToggle">Dark Mode</label>
      <input type="checkbox" id="darkModeToggle" (change)="toggleDarkMode()" [checked]="isDarkMode">
    </div>
  </div>`,
  styleUrl: './app.css'
})
export class App implements OnInit {
  public isDarkMode: boolean = false;

  ngOnInit() {
    this.isDarkMode = localStorage.getItem('darkMode') === 'true';
    if (this.isDarkMode) {
      document.body.classList.add('dark-mode');
    }
  }

  public toggleDarkMode() {
    this.isDarkMode = !this.isDarkMode;
    document.body.classList.toggle('dark-mode', this.isDarkMode);
    localStorage.setItem('darkMode', this.isDarkMode.toString());
  }
}
