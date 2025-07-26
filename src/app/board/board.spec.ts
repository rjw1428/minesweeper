import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BoardComponent } from './board';
import { BOARD_CONFIG, defaultBoardConfig } from '../app.config';

describe('Board', () => {
  let component: BoardComponent;
  let fixture: ComponentFixture<BoardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BoardComponent],
      providers: [
        { provide: BOARD_CONFIG, useValue: defaultBoardConfig },
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
});
