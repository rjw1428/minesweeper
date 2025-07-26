import { Platform } from '@angular/cdk/platform';
import { ApplicationConfig, provideBrowserGlobalErrorListeners, provideZoneChangeDetection, InjectionToken } from '@angular/core';

export interface BoardConfig {
  rows: number;
  columns: number;
  mines: number;
}

export const BOARD_CONFIG = new InjectionToken<BoardConfig>('boardConfig');

export const defaultBoardConfig: BoardConfig = {
  rows: 10,
  columns: 10,
  mines: 15,
};

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    { provide: BOARD_CONFIG, useValue: defaultBoardConfig },
  ]
};