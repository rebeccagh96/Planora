import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ListsService } from '../services/lists-service';
import { ToDoList } from '../../types';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Notification } from '../notification/notification';

@Component({
  selector: 'app-update-list',
  imports: [CommonModule, FormsModule, RouterLink, Notification],
  templateUrl: './update-list.html',
  styleUrl: './update-list.css',
})
export class UpdateList {
  listName: string = '';
  todolist!: ToDoList;
  toDoListId!: number;
  stars!: number;

  @ViewChild('notification') notification!: Notification;

  constructor(
    private route: ActivatedRoute,
    private listsService: ListsService,
    private http: HttpClient,
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.params['id'];

    this.listsService.getListByListId(id).subscribe((list) => {
      this.todolist = list;
      this.listName = list.listName;
      this.stars = list.stars;
    });

    this.toDoListId = Number(this.route.snapshot.paramMap.get('id'));
  }

  updateList() {
    const body = {
      listName: this.listName,
      stars: this.stars,
      toDoListId: this.toDoListId,
    };

    if (this.listName === '') {
      this.notification.showNotification('Du kan inte uppdatera till ett tomt namn!', 'error');
    }
    if (this.listName != '') {
      this.listsService.updateList(body.toDoListId, body).subscribe({
        next: () => {
          (this.notification.showNotification('Listan uppdaterades!', 'success'),
            setTimeout(() => {
              window.location.href = `/list/${this.toDoListId}`;
            }, 3000));
        },
        error: (err) => {
          this.notification.showNotification(
            'Något gick fel, kunde inte uppdatera listan.',
            'error',
          );
        },
      });
    }
  }
}
