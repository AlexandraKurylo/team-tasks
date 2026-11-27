import { HttpClient } from '@angular/common/http';
import { Injectable, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { EMPTY, Observable, Subject, catchError, exhaustMap, finalize, forkJoin, map, retry } from 'rxjs';
import { ApiTodo } from '../models/api-todo';
import { ApiUser } from '../models/api-user';
import { User } from '../models/user';
import { API_URL } from '../tokens';
import { NotificationService } from './notification-service';

const ROLES = ['frontend developer', 'backend developer', 'tester', 'project manager', 'designer'];

export interface UserDetails {
  user: User;
  todos: ApiTodo[];
}

function toUser(apiUser: ApiUser, todos: ApiTodo[]): User {
  const id = apiUser.id;
  const openTasks = todos.filter(t => t.userId === id && !t.completed).length;

  return {
    id,
    name: apiUser.name,
    email: apiUser.email.toLowerCase(),
    role: ROLES[id % ROLES.length],
    joinedAt: new Date(2020 + (id % 5), id % 12, id * 2).toISOString(),
    workload: openTasks / 10,
    isActive: id % 3 !== 0,
  };
}

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private http = inject(HttpClient);
  private apiUrl = inject(API_URL);
  private notifications = inject(NotificationService);

  private readonly _users = signal<User[]>([]);
  private readonly _isLoading = signal(false);
  private readonly _error = signal<string | null>(null);
  private readonly reload$ = new Subject<void>();

  readonly users = this._users.asReadonly();
  readonly isLoading = this._isLoading.asReadonly();
  readonly error = this._error.asReadonly();

  constructor() {
    this.reload$
      .pipe(
        exhaustMap(() => {
          this._isLoading.set(true);
          this._error.set(null);

          return this.getUsers().pipe(
            retry(1),
            catchError(() => {
              this._error.set('Failed to load users. Please try again.');
              return EMPTY;
            }),
            finalize(() => this._isLoading.set(false)),
          );
        }),
        takeUntilDestroyed(),
      )
      .subscribe(users => this._users.set(users));
  }

  getUsers(): Observable<User[]> {
    return forkJoin({
      apiUsers: this.http.get<ApiUser[]>(`${this.apiUrl}/users`),
      todos: this.http.get<ApiTodo[]>(`${this.apiUrl}/todos`),
    }).pipe(
      map(({ apiUsers, todos }) => apiUsers.map(apiUser => toUser(apiUser, todos))),
    );
  }

  getUserDetails(id: number): Observable<UserDetails> {
    return forkJoin({
      apiUser: this.http.get<ApiUser>(`${this.apiUrl}/users/${id}`),
      todos: this.http.get<ApiTodo[]>(`${this.apiUrl}/todos`, { params: { userId: id } }),
    }).pipe(
      map(({ apiUser, todos }) => ({ user: toUser(apiUser, todos), todos })),
    );
  }

  load() {
    this.reload$.next();
  }

  add(name: string) {
    const trimmed = name.trim();
    if (!trimmed) return;

    const body = {
      name: trimmed,
      email: `${trimmed.toLowerCase().replace(/\s+/g, '.')}@mail.com`,
    };

    this.http.post<ApiUser>(`${this.apiUrl}/users`, body).subscribe(created => {
      const newUser: User = {
        id: Date.now(),
        name: created.name,
        email: created.email,
        role: 'new member',
        joinedAt: new Date().toISOString(),
        workload: 0,
        isActive: true,
      };

      this._users.update(list => [...list, newUser]);
      this.notifications.notify(`${newUser.name} added`);
    });
  }

  remove(id: number) {
    const user = this._users().find(u => u.id === id);
    this._users.update(list => list.filter(u => u.id !== id));
    this.notifications.notify(`${user?.name ?? 'User'} removed`);

    this.http.delete(`${this.apiUrl}/users/${id}`).subscribe({
      error: err => console.error('Failed to delete user on server', err),
    });
  }

  toggleActive(id: number) {
    this._users.update(list =>
      list.map(u => (u.id === id ? { ...u, isActive: !u.isActive } : u))
    );

    const user = this._users().find(u => u.id === id);
    if (user) {
      this.notifications.notify(`${user.name} ${user.isActive ? 'activated' : 'deactivated'}`);
    }
  }
}