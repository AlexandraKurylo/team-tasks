import { Component, OnChanges, OnDestroy, OnInit, SimpleChanges, input, output } from '@angular/core';
import { User } from '../../models/user';
import { DatePipe, PercentPipe, TitleCasePipe } from '@angular/common';
import { InitialsPipe, TruncatePipe } from '../../pipes';

@Component({
  selector: 'app-user-card',
  imports: [DatePipe, PercentPipe, TitleCasePipe, InitialsPipe, TruncatePipe],
  templateUrl: './user-card.html',
  styleUrl: './user-card.scss',
})
export class UserCard implements OnChanges, OnInit, OnDestroy {
  user = input.required<User>();
  showEmail = input(false);
  remove = output<number>();
  toggleActive = output<number>();

  constructor() {
    console.log('constructor');
  }

  ngOnChanges(changes: SimpleChanges) {
    console.log('ngOnChanges', changes);
  }

  ngOnInit() {
    console.log('ngOnInit', this.user().name);
  }

  ngOnDestroy() {
    console.log('ngOnDestroy', this.user().name);
  }
}

