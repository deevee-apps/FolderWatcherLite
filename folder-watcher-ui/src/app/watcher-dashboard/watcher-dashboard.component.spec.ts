import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WatcherDashboardComponent } from './watcher-dashboard.component';

describe('WatcherDashboardComponent', () => {
  let component: WatcherDashboardComponent;
  let fixture: ComponentFixture<WatcherDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WatcherDashboardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WatcherDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
