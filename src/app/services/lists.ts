import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ToDoList } from '../../types';

@Injectable({
  providedIn: 'root',
})
export class ListsService {
  constructor(private http: HttpClient) { }

  public getData() : Observable<ToDoList[]> {
    return this.http.get<ToDoList[]>('https://localhost:7097/api/ToDoList')
  }

  public getList(id:string) : Observable<ToDoList> {
    return this.http.get<ToDoList>('https://localhost:7097/api/ToDoList/' + id)
  }
}

