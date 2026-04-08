import { Component, ViewChild } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ToDoList } from '../../types';
import { ListsService } from '../services/lists';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { ConfirmModal } from '../confirm-modal/confirm-modal';
import { Notification } from '../notification/notification';

@Component({
  selector: 'app-list',
  imports: [RouterLink, CommonModule, FormsModule, ConfirmModal, Notification],
  templateUrl: './list.html',
  styleUrl: './list.css',
})
export class List {
  todolist!: ToDoList;
  todolists: ToDoList[] = [];
  isModalOpen = false;
  listIdToDelete: number | null = null;

  @ViewChild('notification') notification!: Notification;

  constructor(
    private route: ActivatedRoute,
    private listsService: ListsService,
    private http: HttpClient,
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id') as string;
    this.listsService.getList(id.toString()).subscribe((data) => {
      console.log(data);
      this.todolist = data;
    });
  }

  openDeleteModal(id: number) {
    this.listIdToDelete = id;
    this.isModalOpen = true;
  }

  confirmDelete() {
    if (this.listIdToDelete == null) return;

    this.deleteList(this.listIdToDelete);
    this.isModalOpen = false;
    this.listIdToDelete = null;
  }

  cancelDelete() {
    this.isModalOpen = false;
    this.listIdToDelete = null;
  }

  deleteList(id: number) {
    if (id == null) {
      this.notification.showNotification(
        'Något gick fel, hittade inte listan du vill radera!',
        'error',
      );
      return;
    }

    if (id != null) {
      this.http.delete(`https://localhost:7097/api/ToDoList/${id}`).subscribe({
        next: () => {
          (this.notification.showNotification('Listan raderades!', 'success'),
            (this.todolists = this.todolists.filter((l) => l.toDoListId !== id)),
            setTimeout(() => {
              window.location.href = '';
            }, 3000));
        },
        error: (err) => {
          this.notification.showNotification('Något gick fel, kunde inte ta bort listan!', 'error');
        },
      });
    }
  }

  toggleCompleted(todo: any) {
    const body = { toDoId: todo.toDoId, name: todo.name, completed: !todo.completed };

    if (todo == null) {
      this.notification.showNotification('Kan inte ändra status på uppgiften!', 'error');
    }
    if (todo != null) {
      this.http.patch(`https://localhost:7097/api/ToDoList/ToDo/${body.toDoId}`, body).subscribe({
        next: () => {
          todo.completed = body.completed;
          this.starsCounter();
          this.updateStars(todo.toDoListId, this.todolist);
        },
        error: (err) => {
          this.notification.showNotification(
            'Något gick fel, kunde inte ändra status på uppgiften!',
            'error',
          );
        },
      });
    }
  }

  starsCounter() {
    if (!this.todolist || !this.todolist.toDos) return;
    this.todolist.stars = this.todolist.toDos.filter((t) => t.completed).length;
  }

  updateStars(id: number, toDoList: ToDoList) {
    this.http.patch(`https://localhost:7097/api/ToDoList/${id}`, toDoList).subscribe({
      next: () => console.log('Stjärnor uppdaterade!'),
      error: (err) => console.error(err),
    });
  }
}
