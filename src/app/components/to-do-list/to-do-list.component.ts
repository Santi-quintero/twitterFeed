
import { Component, OnInit,  } from '@angular/core';
import { FormControl, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { Task, User } from 'src/app/models/toDoList';
import { ToDoListService } from 'src/app/service/to-do-list.service';

@Component({
  selector: 'app-to-do-list',
  templateUrl: './to-do-list.component.html',
  styleUrls: ['./to-do-list.component.css'],
})
export class ToDoListComponent implements OnInit {

  description = new FormControl('', [Validators.required]);
  estimation = new FormControl('', [Validators.required]);

  usuarios: any = [];
  currentUser: any = {
    id: '',
  };
  task: Task;

  user1: any = [];
  updateUser: any = {
    id: '',
    idTask: '',
  };

  
  user: User = {
    description: '',
    estimation: 0,
  };

  constructor(
    private to_do_listService: ToDoListService,
    private modal: NgbModal,
    private toastr: ToastrService,
  ) {}

  ngOnInit(): void {
    this.getUsersLoggedIn();

  }
  getUsersLoggedIn() {
    this.to_do_listService.getRegisteredUsers().then((data) => {
      this.usuarios = data;
    });
  }

  createUsuario(description:string, estimation:number) {
    this.user={
      description:description,
      estimation: estimation
    }
    this.to_do_listService.addUsuario(this.user).then((res) => {
      this.user1 = res;
      this.currentUser.id = this.user1.idUsuario;
      this.loggin(this.currentUser.id);
    });
  }

  createTask(description:string, estimation:number) {
    this.task={
      id: this.currentUser.id,
      description: description,
      estimation: estimation
    }
    this.to_do_listService.addTask(this.task).then((res) => {
      this.user1 = res;
      console.log(res)
      this.loggin(this.currentUser.id);
    });
   
  }

  loggin(id: string) {
    this.to_do_listService.getUsuarioLogin(id).then((res) => {
      this.user1 = res;
      this.currentUser.id = id;
   
    });
  }
  deleteTask(id: string, idTask: string) {
    this.to_do_listService.deleteTask(id, idTask).then((res) => {
      this.user1 = res;
      this.loggin(this.currentUser.id);
    });
  }

  completedTask(id: string, idTask: string) {
    this.to_do_listService.completedTask(id, idTask, this.user1).then((res) => {
      this.user1 = res;
      this.loggin(this.currentUser.id);
    });
  }
  pendingTask(id: string, idTask: string) {
    this.to_do_listService.pedingTask(id, idTask, this.user1).then((res) => {
      this.user1 = res;
      this.loggin(this.currentUser.id);
    });
  }

  ngModal(contenido,  id, idTask) {
    this.modal.open(contenido, { size: 'sl' });
    this.updateUser = {
      id: id,
      idTask: idTask,
    };
  }
  updateUsuario(description: string, estimation: string) {
    let obj={
      description: description,
      estimation: estimation
    }
    this.to_do_listService
      .updateTask(this.updateUser.id, this.updateUser.idTask, obj)
      .then((res) => {
        this.user1 = res;
        this.loggin(this.currentUser.id);
      });
  }

  back() {
    location.reload();
  }

  
}
