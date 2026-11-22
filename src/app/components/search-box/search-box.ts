import { Component, model } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-search-box',
  imports: [FormsModule],
  template: `<input [(ngModel)]="query" placeholder="Search users" />`,
})

export class SearchBox {
  query = model('');
}
