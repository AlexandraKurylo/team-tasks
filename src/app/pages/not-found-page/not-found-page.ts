import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-not-found-page',
  imports: [RouterLink],
  template: `
    <section class="not-found">
      <h1>404</h1>
      <p>This page doesn't exist.</p>
      <a routerLink="/team">Back to team</a>
    </section>
  `,
  styles: `
    .not-found {
      text-align: center;
      padding: 64px 16px;
    }
    h1 {
      font-size: 64px;
      margin: 0;
      color: #6366f1;
    }
  `,
})
export class NotFoundPage {}
