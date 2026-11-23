import { AfterViewInit, Component, ElementRef, viewChild } from '@angular/core';
import { User } from '../../models/user';
import { UserCard } from '../user-card';
import { SearchBox } from '../search-box';
import { Highlight, Autofocus, Unless } from '../../directives';
import { FilterUsersPipe } from '../../pipes';

@Component({
  selector: 'app-user-list',
  imports: [UserCard, SearchBox, Highlight, Unless, Autofocus, FilterUsersPipe],
  templateUrl: './user-list.html',
  styleUrl: './user-list.scss',
})
export class UserList implements AfterViewInit {
  users: User[] = [
    {
      id: 1,
      name: 'Leanne Graham',
      email: 'leanne.graham@mail.com',
      role: 'frontend developer',
      joinedAt: '2023-03-15',
      workload: 0.85,
      isActive: true,
    },
    {
      id: 2,
      name: 'Ervin Howell',
      email: 'ervin.howell@mail.com',
      role: 'backend developer',
      joinedAt: '2022-11-02',
      workload: 0.4,
      isActive: false,
    },
    {
      id: 3,
      name: 'Clementine Bauch',
      email: 'clementine.bauch@mail.com',
      role: 'tester',
      joinedAt: '2024-06-20',
      workload: 1.1,
      isActive: true,
    },
    {
      id: 4,
      name: 'Patricia Lebsack',
      email: 'patricia.lebsack@mail.com',
      role: 'project manager',
      joinedAt: '2021-09-01',
      workload: 0.6,
      isActive: false,
    },
    {
      id: 5,
      name: 'Chelsey Dietrich',
      email: 'chelsey.dietrich@mail.com',
      role: 'designer',
      joinedAt: '2025-01-10',
      workload: 0.95,
      isActive: true,
    },
  ];

  showEmail = false;
  search = '';
  newNameInput = viewChild.required<ElementRef<HTMLInputElement>>('newName');

  ngAfterViewInit() {
    this.newNameInput().nativeElement.focus();
  }

  toggleEmail() {
    this.showEmail = !this.showEmail;
  }

  addUser(name: string) {
    const trimmed = name.trim();
    if (!trimmed) return;

    const newUser: User = {
      id: Date.now(),
      name: trimmed,
      email: `${trimmed.toLowerCase().replace(/\s+/g, '.')}@mail.com`,
      role: 'new member',
      joinedAt: new Date().toISOString(),
      workload: 0,
      isActive: true,
    };

    this.users = [...this.users, newUser];
  }

  removeUser(id: number) {
    this.users = this.users.filter(u => u.id !== id);
  }
  
  toggleUser(id: number) {
    this.users = this.users.map(u =>
      u.id === id ? { ...u, isActive: !u.isActive } : u
    );
  }
}
