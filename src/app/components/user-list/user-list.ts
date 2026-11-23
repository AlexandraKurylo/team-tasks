import { AfterViewInit, Component, ElementRef, viewChild } from '@angular/core';
import { User } from '../../models/user';
import { UserCard } from '../user-card';
import { SearchBox } from '../search-box';
import { Highlight, Autofocus, Unless } from '../../directives';

@Component({
  selector: 'app-user-list',
  imports: [UserCard, SearchBox, Highlight, Unless, Autofocus],
  templateUrl: './user-list.html',
  styleUrl: './user-list.scss',
})
export class UserList implements AfterViewInit {
  users: User[] = [
    { id: 1, name: 'Leanne Graham', email: 'leanne@mail.com', isActive: true },
    { id: 2, name: 'Ervin Howell', email: 'ervin@mail.com', isActive: false },
    { id: 3, name: 'Clementine Bauch', email: 'clementine@mail.com', isActive: true },
    { id: 4, name: 'Patricia Lebsack', email: 'patricia@mail.com', isActive: false },
    { id: 5, name: 'Chelsey Dietrich', email: 'chelsey@mail.com', isActive: true },
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
