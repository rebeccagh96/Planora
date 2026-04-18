import { Component, Input, ViewChild } from '@angular/core';
import { ListsService } from '../services/lists';
import { ToDoList } from '../../types';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Notification } from '../notification/notification';

@Component({
  selector: 'app-home',
  imports: [CommonModule, RouterLink, Notification],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {
  todolists: ToDoList[] = [];

  @Input() todolist!: ToDoList;

  @ViewChild('notification') notification!: Notification;

  constructor(private listsService: ListsService) {}

  ngOnInit() {
    this.fetchLists();
  }

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
}
