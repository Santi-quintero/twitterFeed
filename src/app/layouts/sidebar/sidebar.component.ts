import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Character } from 'src/app/models/character';
import { CharacterService } from 'src/app/service/character.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  characters!: Character[];
  constructor(
    private characterService: CharacterService,
    private activateRouter: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.cargarCharacters();
  }

  cargarCharacters(){
    this.characterService.list().subscribe(
      data => {
        this.characters = data.results
      },
      err => {
        console.log(err.message)
      }
    )
  }

  searchCharacters(name: string){
     this.characterService.search(name).subscribe(
       data=>{
         this.characters = data.results
       },
       err =>{
         console.log(err.message)
       }
     )

  }

}
