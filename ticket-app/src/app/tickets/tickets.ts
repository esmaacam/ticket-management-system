import { Component, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-tickets',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './tickets.html',
  styleUrl: './tickets.css',
})
export class Tickets implements OnInit {
  tickets = signal<any[]>([]);

  newTicket = {
    title: '',
    description: '',
    createdBy: 1,
    assignedTo: 2,
    status: 'Open'
  };

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.http.get<any[]>('https://localhost:7178/api/tickets')
      .subscribe(data => {
        this.tickets.set(data);
      });
  }

  createTicket() {
    this.http.post<any>('https://localhost:7178/api/tickets', this.newTicket)
      .subscribe(createdTicket => {
        this.tickets.set([...this.tickets(), createdTicket]);

        this.newTicket = {
          title: '',
          description: '',
          createdBy: 1,
          assignedTo: 2,
          status: 'Open'
        };
      });
  }

  deleteTicket(id: number) {
    this.http.delete(`https://localhost:7178/api/tickets/${id}`)
      .subscribe(() => {
        this.tickets.set(
          this.tickets().filter(ticket => ticket.id !== id)
        );
      });
  }

  updateTicket(ticket: any) {
  const updatedTicket = {
    ...ticket,
    status: ticket.status === 'Open' ? 'Closed' : 'Open'
  };

  this.http.put<any>(`https://localhost:7178/api/tickets/${ticket.id}`, updatedTicket)
    .subscribe(result => {
      this.tickets.set(
        this.tickets().map(t => t.id === ticket.id ? result : t)
      );
    });
}
}