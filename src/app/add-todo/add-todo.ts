import { CommonModule } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Notification } from '../notification/notification';
import { ListsService } from '../services/lists-service';

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
    private route: ActivatedRoute,
    private listsService: ListsService,
  ) {}

  ngOnInit() {
    this.toDoListId = Number(this.route.snapshot.paramMap.get('id'));
  }

  createToDo() {
    const body = {
      name: this.name,
      completed: false,
      toDoListId: this.toDoListId,
    };

    if (this.name === '') {
      this.notification.showNotification('Du kan inte skapa en uppgift utan namn!', 'error');
    }

    if (this.name != '') {
      this.listsService.createToDo(this.toDoListId, body).subscribe({
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
