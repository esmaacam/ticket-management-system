import { Component, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './users.html',
  styleUrl: './users.css',
})
export class Users implements OnInit {
  users = signal<any[]>([]);

  newUser = {
    name: '',
    email: ''
  };

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.loadUsers();
  }

  loadUsers() {
    this.http.get<any[]>('https://localhost:7178/api/users')
      .subscribe(data => {
        this.users.set(data);
      });
  }

  createUser() {
    this.http.post<any>('https://localhost:7178/api/users', this.newUser)
      .subscribe(createdUser => {
        this.users.set([...this.users(), createdUser]);

        this.newUser = {
          name: '',
          email: ''
        };
      });
  }

  updateUser(user: any) {
    this.http.put<any>(`https://localhost:7178/api/users/${user.id}`, user)
      .subscribe(updatedUser => {
        this.users.set(
          this.users().map(u => u.id === user.id ? updatedUser : u)
        );
      });
  }

  deleteUser(id: number) {
    this.http.delete(`https://localhost:7178/api/users/${id}`)
      .subscribe(() => {
        this.users.set(
          this.users().filter(user => user.id !== id)
        );
      });
  }
}