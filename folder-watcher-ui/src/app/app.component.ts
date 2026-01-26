import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { WatcherDashboardComponent } from "./watcher-dashboard/watcher-dashboard.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, WatcherDashboardComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'folder-watcher-ui';
}
