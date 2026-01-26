import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { FileEvent } from '../models/file-event.model';

@Injectable({ providedIn: 'root' })
export class WatcherService {
  private apiUrl = 'http://localhost:4000/api/watch';

  constructor(private http: HttpClient) {}

  startWatching(path: string): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}/start`, { path });
  }

  stopWatching(): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}/stop`, {});
  }

  getEvents(): Observable<FileEvent[]> {
    return this.http.get<FileEvent[]>(`${this.apiUrl}/events`);
  }
}
