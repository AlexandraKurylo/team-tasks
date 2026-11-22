import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { UserList } from './components/user-list';
import { Panel } from './components/panel';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Panel, UserList],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {}
