import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  tweets: any[]=[];
  tweet:any={};
  constructor() { }

  ngOnInit(): void {
  }

  guardar(){
    this.tweets.push(this.tweet)
    this.tweet={}
    console.log(this.tweets)
    console.log(this.tweet)
  }
}
