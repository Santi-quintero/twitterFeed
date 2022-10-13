import { Component, OnInit } from '@angular/core';
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
  ) { }

  ngOnInit(): void {
    this.cargarCharacters();
  }

  cargarCharacters(){
    this.characterService.list().subscribe(
      data => {
        this.characters = data.results
        console.log(this.characters)
      },
      err => {
        console.log(err.message)
      }
    )
  }

}
