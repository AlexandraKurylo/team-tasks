import { Component, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
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
  message = signal<string | null>(null);

  constructor() {
    inject(NotificationService)
      .messages$.pipe(takeUntilDestroyed())
      .subscribe(text => {
        this.message.set(text);
        setTimeout(() => this.message.set(null), 3000);
      });
  }
}
