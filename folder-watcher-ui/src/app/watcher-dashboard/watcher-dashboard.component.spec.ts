import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { WatcherService } from '../core/services/watcher.service';

import { WatcherDashboardComponent } from './watcher-dashboard.component';
import { provideHttpClient } from '@angular/common/http';

describe('WatcherDashboardComponent', () => {
  let component: WatcherDashboardComponent;
  let fixture: ComponentFixture<WatcherDashboardComponent>;
  let watcherServiceSpy: jasmine.SpyObj<WatcherService>;

  beforeEach(async () => {
    watcherServiceSpy = jasmine.createSpyObj('WatcherService', ['startWatching', 'stopWatching', 'getEvents']);
    watcherServiceSpy.startWatching.and.returnValue(of(void 0));
    watcherServiceSpy.stopWatching.and.returnValue(of(void 0));
    watcherServiceSpy.getEvents.and.returnValue(of([]));

    await TestBed.configureTestingModule({
      imports: [WatcherDashboardComponent],
      providers: [provideHttpClient()]
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
    component.folderPath = 'C:\\Test\\Folder';
    fixture.detectChanges();

    const buttons = fixture.nativeElement.querySelectorAll('button') as NodeListOf<HTMLButtonElement>;
    const startBtn = buttons[0];
    startBtn.click();

    expect(watcherServiceSpy.startWatching).toHaveBeenCalledWith('C:\\Test\\Folder');
  });

  it('should call stopWatching when Stop is clicked', () => {
    const buttons = fixture.nativeElement.querySelectorAll('button') as NodeListOf<HTMLButtonElement>;
    const stopBtn = buttons[1];
    stopBtn.click();

    expect(watcherServiceSpy.stopWatching).toHaveBeenCalled();
  });
});
