import { Component } from '@angular/core';
import { Panel } from '../../components/panel';
import { TeamStats } from '../../components/team-stats';
import { UserList } from '../../components/user-list';

@Component({
  selector: 'app-team-page',
  imports: [Panel, TeamStats, UserList],
  templateUrl: './team-page.html',
})
export class TeamPage {}
