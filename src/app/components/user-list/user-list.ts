import { Component, inject } from '@angular/core';
import { UserCard } from '../user-card';
import { SearchBox } from '../search-box';
import { Autofocus, Highlight, Unless } from '../../directives';
import { FilterUsersPipe } from '../../pipes';
import { UserService } from '../../services/user-service';

@Component({
  selector: 'app-user-list',
  imports: [UserCard, SearchBox, Highlight, Unless, Autofocus, FilterUsersPipe],
  templateUrl: './user-list.html',
  styleUrl: './user-list.scss',
})
export class UserList {
  private userService = inject(UserService);

  users = this.userService.users;
  showEmail = false;
  search = '';

  toggleEmail() {
    this.showEmail = !this.showEmail;
  }

  addUser(name: string) {
    this.userService.add(name);
  }

  removeUser(id: number) {
    this.userService.remove(id);
  }

  toggleUser(id: number) {
    this.userService.toggleActive(id);
  }
}