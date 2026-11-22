import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-user-list',
  imports: [FormsModule],
  templateUrl: './user-list.html',
  styleUrl: './user-list.scss',
})
export class UserList {
  users = [
    { id: 1, name: 'Leanne Graham', email: 'leanne@mail.com', isActive: true },
    { id: 2, name: 'Ervin Howell', email: 'ervin@mail.com', isActive: false },
    { id: 3, name: 'Clementine Bauch', email: 'clementine@mail.com', isActive: true },
    { id: 4, name: 'Patricia Lebsack', email: 'patricia@mail.com', isActive: false },
    { id: 5, name: 'Chelsey Dietrich', email: 'chelsey@mail.com', isActive: true },
  ];
  showEmail = false;
  search = '';

  toggleEmail() {
    this.showEmail = !this.showEmail;
  }

  addUser(name: string) {
    const trimmed = name.trim();
    if (!trimmed) return;

    const newUser = {
      id: Date.now(),
      name: trimmed,
      email: `${trimmed.toLowerCase().replace(/\s+/g, '.')}@mail.com`,
      isActive: true,
    };

    this.users = [...this.users, newUser];
  }
}
