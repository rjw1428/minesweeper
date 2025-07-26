import { ComponentFixture, TestBed } from '@angular/core/testing';
import { App } from './app';
import { BOARD_CONFIG, defaultBoardConfig } from './app.config';

describe('App', () => {
  let component: App;
  let fixture: ComponentFixture<App>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [App],
      providers: [
        { provide: BOARD_CONFIG, useValue: defaultBoardConfig },
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(App);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(App);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should render title', () => {
    const fixture = TestBed.createComponent(App);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h1')?.textContent).toContain('Minesweeper');
  });

  it('should not display mobile help text on non-mobile devices', () => {
    component.isMobile.set(false)
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.mobile-help-text')).toBeNull();
  });

  it('should display mobile help text on mobile devices', () => {
    component.isMobile.set(true); // Manually set for test
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.mobile-help-text')).toBeTruthy();
  });
});
