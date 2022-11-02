import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.prod';
import { Observable } from 'rxjs';
import { Task, User } from '../models/toDoList';

@Injectable({
  providedIn: 'root',
})
export class ToDoListService {
  API_URL = environment.URLTo_do_List;
  constructor(private http: HttpClient) {}

  getRegisteredUsers(){
    return new Promise((resolve, reject) => {
      this.http.get(this.API_URL).subscribe({
        next: (data) => {
          resolve(data);
        },
        error: (err) => {
          reject(err.message);
        },
      });
    });
  }
  getUsuarioLogin(id: string) {
    return new Promise((resolve, reject) => {
      this.http.get(`${this.API_URL}/${id}`).subscribe({
        next: (data) => {
          resolve(data);
        },
        error: (err) => {
          reject(err.message);
        },
      });
    });
  }
  addUsuario(user: User) {
    return new Promise((resolve, reject) => {
      this.http.post(`${this.API_URL}/user`, user).subscribe({
        next: (data) => {
          resolve(data);
        },
        error: (err) => {
          reject(err.message);
        },
      });
    });
  }
  addTask(task: Task) {
    return new Promise((resolve, reject) => {
      this.http.post(`${this.API_URL}`, task).subscribe({
        next: (data) => {
          resolve(data);
        },
        error: (err) => {
          reject(err.message);
        },
      });
    });
    // return this.http.post(`${this.API_URL}`, to_do_list);
  }

  // deleteUsuario(id: string, idTask: number) {
  //   return this.http.delete(`${this.API_URL}/${id}/${idTask}`);
  // }

  // updateUsuario(
  //   id: string,
  //   idTask: number,
  //   to_do_list: ToDoList
  // ): Observable<any> {
  //   return this.http.put<any>(`${this.API_URL}/${id}/${idTask}`, to_do_list);
  // }

  // completedTask(id: string, idTask: number, to_do_list: ToDoList) {
  //   return this.http.patch(
  //     `${this.API_URL}/completed/${id}/${idTask}`,
  //     to_do_list
  //   );
  // }
  // pedingTask(id: string, idTask: number, to_do_list: ToDoList) {
  //   return this.http.patch(
  //     `${this.API_URL}/pending/${id}/${idTask}`,
  //     to_do_list
  //   );
  // }
}
