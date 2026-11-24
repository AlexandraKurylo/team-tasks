import { Component, computed, inject } from '@angular/core';
import { PercentPipe } from '@angular/common';
import { UserService } from '../../services/user-service';

@Component({
  selector: 'app-team-stats',
  imports: [PercentPipe],
  templateUrl: './team-stats.html',
  styleUrl: './team-stats.scss',
})
export class TeamStats {
  private users = inject(UserService).users;

  total = computed(() => this.users().length);
  active = computed(() => this.users().filter(u => u.isActive).length);
  overloaded = computed(() => this.users().filter(u => u.workload > 1).length);
  averageWorkload = computed(() => {
    const list = this.users();
    if (!list.length) return 0;
    return list.reduce((sum, u) => sum + u.workload, 0) / list.length;
  });
}
