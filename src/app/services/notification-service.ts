import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  private readonly messagesSubject = new Subject<string>();
  private readonly countSubject = new BehaviorSubject<number>(0);

  readonly messages$ = this.messagesSubject.asObservable();
  readonly count$ = this.countSubject.asObservable();

  notify(message: string) {
    this.messagesSubject.next(message);
    this.countSubject.next(this.countSubject.value + 1);
  }
}
