import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { WatcherDashboardComponent } from './watcher-dashboard.component';
import { WatcherService } from '../core/services/watcher.service';

describe('WatcherDashboardComponent', () => {
  let component: WatcherDashboardComponent;
  let fixture: ComponentFixture<WatcherDashboardComponent>;
  let watcherServiceSpy: jasmine.SpyObj<WatcherService>;

  beforeEach(async () => {
    const mockService = jasmine.createSpyObj<WatcherService>('WatcherService', [
      'startWatching',
      'stopWatching',
      'getEvents',
    ]);
    mockService.startWatching.and.returnValue(of(void 0));
    mockService.stopWatching.and.returnValue(of(void 0));
    mockService.getEvents.and.returnValue(of([]));

    await TestBed.configureTestingModule({
      imports: [WatcherDashboardComponent],
      providers: [{ provide: WatcherService, useValue: mockService }],
    })
    .compileComponents();

    fixture = TestBed.createComponent(WatcherDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call startWatching with folderPath when Start Watching is clicked', () => {
    const service = TestBed.inject(WatcherService);
    component.folderPath = 'C\\Test\\Folder';
    fixture.detectChanges();

    const buttons = fixture.nativeElement.querySelectorAll('button') as NodeListOf<HTMLButtonElement>;
    (buttons[0] as HTMLButtonElement).click();
    expect(service.startWatching).toHaveBeenCalledWith('C\\Test\\Folder');
  });

  it('should call stopWatching when Stop is clicked', () => {
    const service = TestBed.inject(WatcherService);
    fixture.detectChanges();

    const buttons = fixture.nativeElement.querySelectorAll('button') as NodeListOf<HTMLButtonElement>;
    (buttons[1] as HTMLButtonElement).click();
    expect(service.stopWatching).toHaveBeenCalled();
  });
});
