import chokidar, { FSWatcher } from 'chokidar';
import { FileEvent } from '../models/file-event';

class WatcherService {
  private watcher: FSWatcher | null = null;
  private events: FileEvent[] = [];

  start(path: string) {
    if (this.watcher) return;
    this.watcher = chokidar.watch(path, { persistent: true, ignoreInitial: true });

    this.watcher
      .on('add', p => this.push('added', p))
      .on('change', p => this.push('changed', p))
      .on('unlink', p => this.push('deleted', p));
  }

  stop() {
    if (this.watcher) {
      this.watcher.close();
      this.watcher = null;
    }
  }

  getEvents() {
    return this.events;
  }

  private push(eventType: FileEvent['eventType'], filename: string) {
    this.events.push({
      filename,
      eventType,
      timestamp: new Date().toISOString()
    });
  }
}

export const watcherService = new WatcherService();