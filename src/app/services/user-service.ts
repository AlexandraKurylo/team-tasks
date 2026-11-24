import { HttpClient } from '@angular/common/http';
import { Injectable, inject, signal } from '@angular/core';
import { Observable, map } from 'rxjs';
import { ApiUser } from '../models/api-user';
import { User } from '../models/user';
import { API_URL } from '../tokens';

const ROLES = ['frontend developer', 'backend developer', 'tester', 'project manager', 'designer'];

function toUser(apiUser: ApiUser): User {
  const id = apiUser.id;
  return {
    id,
    name: apiUser.name,
    email: apiUser.email.toLowerCase(),
    role: ROLES[id % ROLES.length],
    joinedAt: new Date(2020 + (id % 5), id % 12, id * 2).toISOString(),
    workload: (((id * 37) % 70) + 50) / 100,
    isActive: id % 3 !== 0,
  };
}

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private http = inject(HttpClient);
  private apiUrl = inject(API_URL);

  private readonly _users = signal<User[]>([]);
  private readonly _isLoading = signal(false);
  private readonly _error = signal<string | null>(null);

  readonly users = this._users.asReadonly();
  readonly isLoading = this._isLoading.asReadonly();
  readonly error = this._error.asReadonly();

  getUsers(): Observable<User[]> {
    return this.http
      .get<ApiUser[]>(`${this.apiUrl}/users`)
      .pipe(map(apiUsers => apiUsers.map(toUser)));
  }

  load() {
    this._isLoading.set(true);
    this._error.set(null);

    this.getUsers().subscribe({
      next: users => {
        this._users.set(users);
        this._isLoading.set(false);
      },
      error: () => {
        this._error.set('Failed to load users. Please try again.');
        this._isLoading.set(false);
      },
    });
  }

  add(name: string) {
    const trimmed = name.trim();
    if (!trimmed) return;

    const body = {
      name: trimmed,
      email: `${trimmed.toLowerCase().replace(/\s+/g, '.')}@mail.com`,
    };

    this.http.post<ApiUser>(`${this.apiUrl}/users`, body).subscribe(created => {
      console.log('Server response:', created);

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
    });
  }

  remove(id: number) {
    this._users.update(list => list.filter(u => u.id !== id));

    this.http.delete(`${this.apiUrl}/users/${id}`).subscribe({
      error: err => console.error('Failed to delete user on server', err),
    });
  }

  toggleActive(id: number) {
    this._users.update(list =>
      list.map(u => (u.id === id ? { ...u, isActive: !u.isActive } : u))
    );
  }
}