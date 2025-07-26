import { ApplicationConfig, provideBrowserGlobalErrorListeners, provideZoneChangeDetection } from '@angular/core';

interface BoardConfig {
  rows: number;
  columns: number;
  mines: number;
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
  ]
};

export const boardConfig: BoardConfig = {
  rows: 10,
  columns: 10,
  mines: 15
}