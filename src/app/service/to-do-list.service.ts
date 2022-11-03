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

  getRegisteredUsers() {
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
  }

  deleteTask(id: string, idTask: string) {
    return new Promise((resolve, reject) => {
      this.http.delete(`${this.API_URL}/${id}/${idTask}`).subscribe({
        next: (data) => {
          resolve(data);
        },
        error: (err) => {
          reject(err.message);
        },
      });
    });
  }
  updateTask(id: string, idTask: string, task: any) {
    return new Promise((resolve, reject) => {
      this.http.put<any>(`${this.API_URL}/${id}/${idTask}`, task).subscribe({
        next: (data) => {
          resolve(data);
        },
        error: (err) => {
          reject(err.message);
        },
      });
    });
  }
  completedTask(id: string, idTask: string, task: Task) {
    return new Promise((resolve, reject) => {
      this.http
        .patch(`${this.API_URL}/completed/${id}/${idTask}`, task)
        .subscribe({
          next: (data) => {
            resolve(data);
          },
          error: (err) => {
            reject(err.message);
          },
        });
    });
  }
  pedingTask(id: string, idTask: string, task: Task) {
    return new Promise((resolve, reject) => {
      this.http
        .patch(`${this.API_URL}/pending/${id}/${idTask}`, task)
        .subscribe({
          next: (data) => {
            resolve(data);
          },
          error: (err) => {
            reject(err.message);
          },
        });
    });
  }
}
