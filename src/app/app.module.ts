import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './layouts/navbar/navbar.component';
import { HomeComponent } from './home/home.component';
import { SidebarComponent } from './layouts/sidebar/sidebar.component';

import { HttpClientModule } from  '@angular/common/http'
import {FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap'

import { ToDoListService } from './service/to-do-list.service';
import { ToDoListComponent } from './components/to-do-list/to-do-list.component';
import  {  ToastrModule  }  from  'ngx-toastr' ;
import { BrowserAnimationsModule} from '@angular/platform-browser/animations'
import { ReactiveFormsModule } from '@angular/forms';
@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    SidebarComponent,
    ToDoListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    NgbModule,
    BrowserAnimationsModule, // required animations module
    ToastrModule.forRoot(), 
    ReactiveFormsModule
   
  ],
  providers: [
    ToDoListService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
