import { Component, ViewChild } from '@angular/core';
import { ToDo, ToDoList } from '../../types';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ListsService } from '../services/lists-service';
import { HttpClient } from '@angular/common/http';
import { ConfirmModal } from '../confirm-modal/confirm-modal';
import { Notification } from '../notification/notification';

@Component({
  selector: 'app-update-todo',
  imports: [CommonModule, FormsModule, RouterLink, ConfirmModal, Notification],
  templateUrl: './update-todo.html',
  styleUrl: './update-todo.css',
})
export class UpdateTodo {
  listName: string = '';
  toDoListId!: number;
  todolist!: ToDoList;
  todos: ToDo[] = [];
  toDoId!: number;
  name: string = '';
  completed!: boolean;
  toDoIdToDelete: number | null = null;
  isModalOpen = false;

  @ViewChild('notification') notification!: Notification;

  constructor(
    private route: ActivatedRoute,
    private listsService: ListsService,
    private http: HttpClient,
  ) {}

  ngOnInit() {
    const listid = this.route.snapshot.params['listid'];
    this.toDoId = Number(this.route.snapshot.params['todoid']);
    this.listsService.getListByListId(listid).subscribe((list) => {
      this.todolist = list;
      this.listName = list.listName;
      this.toDoListId = list.toDoListId;
      this.todos = list.toDos;

      const todo = list.toDos.find((t) => t.toDoId === this.toDoId);
      if (todo != null) {
        this.completed = todo.completed;
      }
      if (todo) {
        this.name = todo.name;
      }
    });
  }

  updateToDo() {
    const body = {
      toDoId: this.toDoId,
      completed: this.completed,
      name: this.name,
    };

    if (this.name == '') {
      this.notification.showNotification('Du kan inte uppdatera till ett tomt namn!', 'error');
    }

    if (this.name != '') {
      this.listsService.updateToDo(this.toDoId, body).subscribe({
        next: () => {
          (this.notification.showNotification('Uppgiften uppdaterades!', 'success'),
            setTimeout(() => {
              window.location.href = `/list/${this.toDoListId}`;
            }, 3000));
        },
        error: (err) => {
          this.notification.showNotification(
            'Något gick fel, kunde inte uppdatera uppgiften.',
            'error',
          );
        },
      });
    }
  }

  openDeleteModal(id: number) {
    this.toDoIdToDelete = id;
    this.isModalOpen = true;
  }

  confirmDelete() {
    if (this.toDoIdToDelete == null) return;

    this.deleteToDo(this.toDoIdToDelete);
    this.isModalOpen = false;
    this.toDoIdToDelete = null;
  }

  cancelDelete() {
    this.isModalOpen = false;
    this.toDoIdToDelete = null;
  }

  deleteToDo(id: number) {
    if (id == null) {
      this.notification.showNotification(
        'Något gick fel, hittade inte uppgiften du vill radera!',
        'error',
      );
      return;
    }

    const todoToDelete = this.todos.find((t) => t.toDoId === id);

    if (id != null) {
      this.listsService.deleteToDo(id).subscribe({
        next: () => {
          if (todoToDelete?.completed) {
            this.todolist.stars--;
            this.listsService.updateList(this.toDoListId, this.todolist).subscribe();
          }
          (this.notification.showNotification('Uppgiften raderades!', 'success'),
            (this.todos = this.todos.filter((l) => l.toDoId !== id)),
            setTimeout(() => {
              window.location.href = `/list/${this.toDoListId}`;
            }, 3000));
        },
        error: (err) => {
          this.notification.showNotification(
            'Något gick fel, kunde inte radera uppgiften.',
            'error',
          );
        },
      });
    }
  }
}
