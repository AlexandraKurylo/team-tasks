import { Pipe, PipeTransform } from '@angular/core';
import { User } from '../models/user';

@Pipe({
  name: 'filterUsers',
})
export class FilterUsersPipe implements PipeTransform {
  transform(users: User[], query: string): User[] {
    const normalized = query.trim().toLowerCase();
    if (!normalized) return users;

    return users.filter(user =>
      user.name.toLowerCase().includes(normalized) ||
      user.email.toLowerCase().includes(normalized)
    );
  }
}