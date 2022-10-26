import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Character, CharacterList, Origin } from 'src/app/models/character';
import { CharacterService } from 'src/app/service/character.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
})
export class SidebarComponent implements OnInit {
  characters!: Character[];
  // details!: Character;
  details!: any;
  newObjeto: any;
  charactersEpisodes!: Character[];
  origin!: Origin[];
  charactersList: CharacterList[] = [];
  episodes: any;

  constructor(
    private characterService: CharacterService,
    private modal: NgbModal
  ) {
    this.characters = [];
  }

  ngOnInit(): void {
    this.cargarCharacters();
    // this.getCharactersEpisode();
  }

  cargarCharacters() {
    this.characterService.list().subscribe(
      (data) => {
        this.characters = data.results;
      },
      (err) => {
        console.log(err.message);
      }
    );
  }

  searchCharacters(name: string) {
    this.characterService.search(name).subscribe(
      (data) => {
        this.characters = data.results;
      },
      (err) => {
        console.log(err.message);
      }
    );
  }
  getnumber(num: number){
  this.buildModal(this.episodes,this.details,num)
  }

  async detailCharacter(contenido: any, id:number){
    this.modal.open(contenido, {size: 'xl'});
    this.characterService.detail(id).subscribe(
      (data)=>{
        this.details = {
          image:data.image,
          name:data.name,
          status:data.status,
          species:data.species,
          type:data.type,
          gender:data.gender,
          url:data.url,
          created:data.created,
          episodes:[]
        };
        this.episodes = data;
        this.buildModal(data, this.details,1)
      }
    )
  }

  async buildModal(data: any, character: any, num: number) {
    const arrPromise = []
   for (const url_episode of data.episode) {
    arrPromise.push(this.getEpisodeData(url_episode))
   }
    character.episodes= await Promise.all(arrPromise)
    const arrPromise2 = []
    for (const epi of character.episodes) {
      if (epi.id == num) {
        for (const url_character of epi.characters) {
          arrPromise2.push(this.getCharacter(url_character))
        }
      }
    }
    const characters = await Promise.all(arrPromise2)
    this.newObjeto = characters
  }


  async getCharacter(url: string){
    const episode={
      origin:{
        name:'',
        type:'',
        dimension:'',
      },
      name:'',
      image:'',
      id:1
    }
    const response = await fetch(url)
    const data = await response.json();
    episode.name = data.name;
    episode.image = data.image;
    episode.id = data.id;

    if (data.origin.url === '') {
      episode.origin.name = 'unknown'
      episode.origin.type = 'unknown'
      episode.origin.dimension = 'unknown'
    }else{
      const origin = await this.getOrigin(data.origin.url);
      episode.origin.name = origin.name;
      episode.origin.type = origin.type;
      episode.origin.dimension = origin.dimension;
    }
    return episode
  }

  async getOrigin(url: string){
    const origin={
      name:'',
      type:'',
      dimension:'',
    }
    const response = await fetch(url)
    const data = await response.json();
    origin.name = data.name;
    origin.type = data.type;
    origin.dimension = data.dimension;
    return origin
  }

  async getEpisodeData(url: string){
    const episode={
      id: 1,
      name:'',
      characters:[]
    }
    const response= await fetch(url);
    const data= await response.json();
    episode.id = data.id;
    episode.name = data.name;
    episode.characters = data.characters;
    return episode;
  }

  async getApiData(url: string){
    const response = await fetch(url);
    const data = await response.json()
    return data;
  }
}
