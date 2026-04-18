import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { Notification } from '../notification/notification';
import { ListsService } from '../services/lists';

@Component({
  selector: 'app-new-list',
  imports: [FormsModule, CommonModule, RouterLink, Notification],
  templateUrl: './new-list.html',
  styleUrl: './new-list.css',
})
export class NewList {
  listName: string = '';

  @ViewChild('notification') notification!: Notification;

  constructor(
    private http: HttpClient,
    private listsService: ListsService,
  ) {}

  createList() {
    const body = {
      listName: this.listName,
      stars: 0,
    };

    if (this.listName === '') {
      this.notification.showNotification('Du kan inte skapa en lista utan namn!', 'error');
    }

    if (this.listName != '') {
      this.listsService.createList(body).subscribe({
        next: () => {
          (this.notification.showNotification('Lista skapad!', 'success'),
            setTimeout(() => {
              window.location.href = '';
            }, 3000));
        },
        error: (err) => {
          this.notification.showNotification(
            'Något gick fel, kunde inte skapa en ny lista.',
            'error',
          );
        },
      });
    }
  }
}
