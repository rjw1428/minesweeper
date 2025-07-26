import { ComponentFixture, TestBed } from '@angular/core/testing';
import { App } from './app';
import { BOARD_CONFIG, defaultBoardConfig } from './app.config';
import { Platform } from '@angular/cdk/platform';

const mockPlatform = {
  isBrowser: true,
  ANDROID: false,
  IOS: false,
};

describe('App', () => {
  let component: App;
  let fixture: ComponentFixture<App>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [App],
      providers: [
        { provide: BOARD_CONFIG, useValue: defaultBoardConfig },
        { provide: Platform, useValue: mockPlatform }
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


  it('should display mobile help text on mobile devices', () => {
    mockPlatform.ANDROID = true;
    component.isMobile = true; // Manually set for test
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.mobile-help-text')).toBeTruthy();
  });

  it('should not display mobile help text on non-mobile devices', () => {
    mockPlatform.ANDROID = false;
    mockPlatform.IOS = false;
    component.isMobile = false; // Manually set for test
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.mobile-help-text')).toBeNull();
  });
});
