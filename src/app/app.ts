import { Component, signal, ChangeDetectionStrategy } from '@angular/core';
import { BoardComponent } from './board/board';
import { CommonModule } from '@angular/common';
import { Platform } from '@angular/cdk/platform';

@Component({
  selector: 'app-root',
  imports: [BoardComponent, CommonModule],
  template: `
    <div class="container">
    <h1>Minesweeper</h1>
    <app-board></app-board>
    <div class="dark-mode-toggle">
      <label for="darkModeToggle">Dark Mode</label>
      <input type="checkbox" id="darkModeToggle" (change)="toggleDarkMode()" [checked]="isDarkMode()">
    </div>
    @if (isMobile()) {
      <div *ngIf="isMobile()" class="mobile-help-text">Press and hold to plant a flag</div>
    }
  </div>`,
  styleUrl: './app.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class App {
  isDarkMode = signal(false);
  isMobile = signal(false);

  constructor(private platform: Platform) {
    this.isMobile.set(this.platform.isBrowser && (this.platform.ANDROID || this.platform.IOS));
    this.isDarkMode.set(localStorage.getItem('darkMode') === 'true');

    if (this.isDarkMode()) {
      document.body.classList.add('dark-mode');
    }
  }

  public toggleDarkMode() {
    this.isDarkMode.set(!this.isDarkMode());
    document.body.classList.toggle('dark-mode', this.isDarkMode());
    localStorage.setItem('darkMode', this.isDarkMode().toString());
  }
}
