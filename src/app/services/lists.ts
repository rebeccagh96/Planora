import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ToDoList } from '../../types';

@Injectable({
  providedIn: 'root',
})
export class ListsService {
  constructor(private http: HttpClient) {}

  public getAllLists(): Observable<ToDoList[]> {
    return this.http.get<ToDoList[]>('https://localhost:7097/api/ToDoList');
  }

  public getListByListId(id: string): Observable<ToDoList> {
    return this.http.get<ToDoList>('https://localhost:7097/api/ToDoList/' + id);
  }

  public createList(body: any) {
    return this.http.post('https://localhost:7097/api/ToDoList', body);
  }

  public updateList(toDoListId: number, body: any) {
    return this.http.patch(`https://localhost:7097/api/ToDoList/${toDoListId}`, body);
  }

  public deleteList(toDoListId: number) {
    return this.http.delete(`https://localhost:7097/api/ToDoList/${toDoListId}`);
  }

  public createToDo(toDoListId: number, body: any) {
    return this.http.post(`https://localhost:7097/api/ToDoList/${toDoListId}`, body);
  }

  public updateToDo(toDoId: number, body: any) {
    return this.http.patch(`https://localhost:7097/api/ToDoList/ToDo/${toDoId}`, body);
  }

  public deleteToDo(toDoId: number) {
    return this.http.delete(`https://localhost:7097/api/ToDoList/ToDo/${toDoId}`);
  }
}
