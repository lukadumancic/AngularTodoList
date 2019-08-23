import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Todo } from '../models';
import { Observable } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  todosUrl: string = 'https://jsonplaceholder.typicode.com/todos';
  todosLimit: number = 5;

  constructor(private http: HttpClient) {}

  getTodos(): Observable<Todo[]> {
    return this.http.get<Todo[]>(`${this.todosUrl}?_limit=${this.todosLimit}`);
  }

  toggleCompleted(todo: Todo): Observable<any> {
    const url = `${this.todosUrl}/${todo.id}`;
    return this.http.put(url, todo, httpOptions);
  }

  deleteTodo(todo: Todo): Observable<any> {
    const url = `${this.todosUrl}/${todo.id}`;
    return this.http.delete<Todo>(url, httpOptions);
  }

  addTodo(todo: Todo): Observable<any> {
    return this.http.post<Todo>(this.todosUrl, todo, httpOptions);
  }
}
