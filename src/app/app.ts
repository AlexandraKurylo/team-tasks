import { Component, inject, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { RouterOutlet } from '@angular/router';
import { Panel } from './components/panel';
import { TeamStats } from './components/team-stats';
import { UserList } from './components/user-list';
import { Toast } from './components/toast/toast';
import { SessionTimer } from './components/session-timer/session-timer';
import { NotificationService } from './services/notification-service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Panel, TeamStats, UserList, Toast, SessionTimer],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  notificationsCount = toSignal(inject(NotificationService).count$, { initialValue: 0 });
  showTimer = signal(true);
}
