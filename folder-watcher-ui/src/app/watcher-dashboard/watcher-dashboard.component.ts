import { Component } from '@angular/core';
import { WatcherService } from '../core/services/watcher.service';
import { FileEvent } from '../core/models/file-event.model';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-watcher-dashboard',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './watcher-dashboard.component.html',
  styleUrl: './watcher-dashboard.component.scss'
})
export class WatcherDashboardComponent {
  events: FileEvent[] = [];
  folderPath = '';

  constructor(private watcherService: WatcherService) {}

  start() {
    this.watcherService.startWatching(this.folderPath).subscribe();
  }

  stop() {
    this.watcherService.stopWatching().subscribe();
  }

  ngOnInit() {
    setInterval(() => {
      this.watcherService.getEvents().subscribe(data => {
        this.events = data;
      });
    }, 2000);
  }

  get addedEvents(): FileEvent[] {
    return this.events.filter(e => e.eventType === 'added');
  }

  get changedEvents(): FileEvent[] {
    return this.events.filter(e => e.eventType === 'changed');
  }

  get deletedEvents(): FileEvent[] {
    return this.events.filter(e => e.eventType === 'deleted');
  }
}
