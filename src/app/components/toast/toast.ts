import { Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { concat, map, of, switchMap, timer } from 'rxjs';
import { NotificationService } from '../../services/notification-service';

@Component({
  selector: 'app-toast',
  template: `
    @if (message(); as text) {
      <div class="toast">{{ text }}</div>
    }
  `,
  styles: `
    .toast {
      position: fixed;
      right: 24px;
      bottom: 24px;
      padding: 12px 16px;
      border-radius: 8px;
      background: #1f2937;
      color: #fff;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
    }
  `,
})
export class Toast {
  message = toSignal(
    inject(NotificationService).messages$.pipe(
      switchMap(text =>
        concat(
          of(text),
          timer(3000).pipe(map(() => null)),
        ),
      ),
    ),
    { initialValue: null },
  );
}