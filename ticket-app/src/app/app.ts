import { Component } from '@angular/core';
import { Users } from './users/users';
import { Tickets } from './tickets/tickets';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [Users, Tickets],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {

}