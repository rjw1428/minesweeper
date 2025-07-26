import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BoardComponent } from './board';
import { BOARD_CONFIG, defaultBoardConfig } from '../app.config';
import { GameService } from '../services/game.service';
import { GameState } from '../models/enums';
import { Cell } from '../models/models';

const mockBoard: Cell[][] = Array.from({ length: 20 }, (i) =>
  Array.from({ length: 20 }, (j) => ({
    hasMine: false,
    isRevealed: false,
    isFlagged: false,
    adjacentMines: 0
  }))
);

describe('BoardComponent', () => {
  let component: BoardComponent;
  let fixture: ComponentFixture<BoardComponent>;
  let mockGameService: any;

  beforeEach(async () => {
    mockGameService = {
      getBoard: () => mockBoard,
      getGameState: () => GameState.InProgress,
      getFlagsRemaining: () => 0,
      percentCompleted: () => 0,
      revealCell: jest.fn(),
      flagCell: jest.fn(),
      resetGame: jest.fn(),
    };

    await TestBed.configureTestingModule({
      imports: [BoardComponent],
      providers: [
        { provide: BOARD_CONFIG, useValue: defaultBoardConfig },
        { provide: GameService, useValue: mockGameService }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BoardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should reveal a cell when clicked', () => {
    component.revealCell(0, 0);
    expect(mockGameService.revealCell).toHaveBeenCalledWith(0, 0);
  });

  it('should flag a cell when right-clicked', () => {
    const mockEvent = { preventDefault: jest.fn() } as unknown as MouseEvent;
    component.flagCell(mockEvent, 0, 0);
    expect(mockGameService.flagCell).toHaveBeenCalledWith(0, 0);
    expect(mockEvent.preventDefault).toHaveBeenCalled();
  });

  it('should reset the game', () => {
    component.resetGame();
    expect(mockGameService.resetGame).toHaveBeenCalled();
    expect(component.board).toEqual(mockGameService.getBoard());
    expect(component.gameState()).toEqual(mockGameService.getGameState());
  });

  it('should initialize board and game state on ngOnInit', () => {
    expect(component.board).toEqual(mockGameService.getBoard());
    expect(component.gameState()).toEqual(mockGameService.getGameState());
    expect(component.flagsRemaining()).toEqual(mockGameService.getFlagsRemaining());
    expect(component.percentCompleted()).toEqual(mockGameService.percentCompleted());
  });
});
