import { CommonModule } from '@angular/common';
import { Component, Input, ViewChild } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ToDoList } from '../../types';
import { ListsService } from '../services/lists-service';
import { Notification } from '../notification/notification';

@Component({
  selector: 'app-stars',
  imports: [CommonModule, RouterLink, Notification],
  templateUrl: './stars.html',
  styleUrl: './stars.css',
})
export class Stars {
  todolists: ToDoList[] = [];
  @ViewChild('notification') notification!: Notification;

  constructor(private listsService: ListsService) {}

  fetchLists() {
    this.listsService.getAllLists().subscribe({
      next: (data: ToDoList[]) => {
        this.todolists = data;
      },
      error: (err) => {
        this.notification.showNotification(
          'Något gick fel, kunde inte hämta dina listor.',
          'error',
        );
      },
    });
  }

  ngOnInit() {
    this.fetchLists();
  }

  getTotalCollectedStars(): number {
    let total = 0;
    for (const list of this.todolists) {
      total += list.stars || 0;
    }
    return total;
  }

  @Input() todolist!: ToDoList;
}
