import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-new-list',
  imports: [FormsModule, CommonModule, RouterLink],
  templateUrl: './new-list.html',
  styleUrl: './new-list.css',
})
export class NewList {
  listName: string = '';

  constructor(private http: HttpClient) {}

  createList() {
    const body = { listName: this.listName, stars: 0 };
    if (this.listName == "") {
      alert("Du kan inte skapa en lista utan namn!");
    }
    if (this.listName != "") {
      this.http.post('https://localhost:7097/api/ToDoList', body)
        .subscribe({
        next: () => { alert("Lista skapad!"),
          window.location.href = ""
        },
        error: err => console.error(err)
      });
    }
  }
}
