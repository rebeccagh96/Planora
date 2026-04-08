import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Notification } from '../notification/notification';

@Component({
  selector: 'app-add-todo',
  imports: [FormsModule, CommonModule, RouterLink, Notification],
  templateUrl: './add-todo.html',
  styleUrl: './add-todo.css',
})
export class AddTodo {
  toDoListId!: number;
  name: string = '';

  @ViewChild('notification') notification!: Notification;

  constructor(
    private http: HttpClient,
    private route: ActivatedRoute,
  ) {}

  ngOnInit() {
    this.toDoListId = Number(this.route.snapshot.paramMap.get('id'));
    console.log('LIST-ID:', this.toDoListId);
  }

  createToDo() {
    const body = { name: this.name, completed: false, toDoListId: this.toDoListId };
    if (this.name == '') {
      this.notification.showNotification('Du kan inte skapa en uppgift utan namn!', 'error');
    }
    if (this.name != '') {
      this.http.post('https://localhost:7097/api/ToDoList/' + this.toDoListId, body).subscribe({
        next: () => {
          (this.notification.showNotification('Uppgift skapad!', 'success'),
            setTimeout(() => {
              window.location.href = `/list/${this.toDoListId}`;
            }, 3000));
        },
        error: (err) => {
          this.notification.showNotification(
            'Något gick fel, kunde inte skapa uppgiften.',
            'error',
          );
        },
      });
    }
  }
}
