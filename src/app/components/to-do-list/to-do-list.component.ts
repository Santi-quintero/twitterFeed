import { Component, OnInit } from '@angular/core';
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
  usuarios: any = [];
  currentUser:any={
    id:''
  }

  user1: any=[]
  updateUser:any={
    id: '',
    idTask: 0,
    description: '',
    estimation: 0,
  }
  user: User = {
    description: '',
    estimation: 0,
  };

  constructor(private to_do_listService: ToDoListService,
    private modal: NgbModal,
    private toastr: ToastrService,
    private router: Router) {}

  ngOnInit(): void {
    this.getUsersLoggedIn();
    console.log(this.user1)
  }
  getUsersLoggedIn() {
    this.to_do_listService.getRegisteredUsers()
    .then((data)=>{
      this.usuarios = data;
    })
  }

  createUsuario() {
    console.log(this.user);
    this.to_do_listService.addUsuario(this.user)
    .then((res)=>{
      this.user1 = res
      this.currentUser.id=this.user1.idUsuario
      this.loggin(this.currentUser.id)
    });
  }

  createTask(){
    let addtask={
      id:this.currentUser.id,
      description:this.user.description,
      estimation: this.user.estimation
    }
    console.log(addtask)
    this.to_do_listService.addTask(addtask)
    .then((res)=>{
      this.user1=res
    })
  }

  loggin(id: string) {
    this.to_do_listService.getUsuarioLogin(id)
    .then((res)=>{
      this.user1 =res
      this.currentUser.id=id
    })
  }
  deleteTask(id: string, idTask:number){
    this.to_do_listService.deleteTask(id, idTask)
    .then((res)=>{
      this.user1 =res
      this.loggin(this.currentUser.id)
    })
  }

  completedTask(id: string, idTask:number){
    // this.to_do_listService.completedTask(id,idTask, this.user1).subscribe(
    //   data=>{
    //     console.log(data)
    //   }
    // )
  }
  pendingTask(id: string, idTask:number){
    // this.to_do_listService.pedingTask(id,idTask, this.user1).subscribe(
    //   data=>{
    //     console.log(data)
    //   }
    // )
  }

  ngModal(contenido, idTask, id){
    this.modal.open(contenido, {size: 'sl'});
    this.updateUser.id = id
    this.updateUser.idTask=idTask
    // this.updateUser={
    //   id: id,
    //   idTask: idTask
    // }
  }
  updateUsuario(id: string, idTask:number){
    // delete this.updateUser.id
    // delete this.updateUser.idTask
    // this.to_do_listService.updateUsuario(id, idTask,this.updateUser).subscribe(
    //   (res) => {
    //     console.log(res);
    //   },
    //   (err) => {
    //     console.log(err);
    //   }
    // );
  }
}
