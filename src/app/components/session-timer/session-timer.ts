import { Component, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { interval } from 'rxjs';

@Component({
  selector: 'app-session-timer',
  template: `<p class="timer">Page opened {{ seconds() }} s ago</p>`,
})
export class SessionTimer {
  seconds = signal(0);

  constructor() {
    interval(1000)
      .pipe(takeUntilDestroyed())
      .subscribe(n => {
        console.log('tick', n);
        this.seconds.set(n + 1);
      });
  }
}
