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
  details!: Character;
  charactersEpisodes!: Character[];
  origin!: Origin[];
  charactersList: CharacterList[] = [];

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
  detailCharacter(contenido: any, id: number) {
    this.modal.open(contenido, { size: 'xl' });
    this.characterService.detail(id).subscribe(
      (data) => {
        this.details = data;
      },
      (err) => {
        console.log(err.message);
      }
    );
    this.getCharactersEpisodes(id);
    //this.getCharactersEpisode(id)
  }
  getCharactersEpisode(id: number) {
    let characterEpisodes = {};
    this.characterService.detailCharacterEpisode(id).subscribe((data) => {
      fetch(data)
        .then((res) => {
          return res.json();
        })
        .then((res) => {
          let promises = [];
          for (const character of res.characters) {
            promises.push(this.getApiData(character));
          }
          return Promise.all(promises);
        })
        .then((data) => {
          console.log(data);
          for (let i = 0; i < data.length; i++) {
            characterEpisodes[data[i].id] = {
              id: data[i].id,
              image: data[i].image,
            };
          }
          let origins = [];
          for (const i of data) {
            if (i.origin.url === '') {
              origins.push({
                name: 'Desconocido',
                url: 'https://rickandmortyapi.com/api/location/6',
              });
            } else {
              origins.push(i.origin);
            }
          }
          return origins;
        })
        .then((data) => {
          let promises = [];
          for (const i of data) {
            promises.push(i.url);
          }
          return Promise.all(promises);
        })
        .then((data) => {
          let promises = [];
          for (const i of data) {
            promises.push(this.getApiData(i));
          }
          return Promise.all(promises);
        })
        .then((data) => {
          let promises = [];
          for (const key in characterEpisodes) {
            promises.push(characterEpisodes[key]);
          }
          for (let index = 0; index < data.length; index++) {
            promises[index].name = data[index].name;
            promises[index].type = data[index].type;
            promises[index].dimension = data[index].dimension;
          }
          this.charactersList = promises;
          console.log(this.charactersList);
        });
    });
  }

  getCharactersEpisodes(id: number) {
    this.characterService.episodes(id).subscribe((data) => {
      let characterEpisodes = {};
      let promises = [];
      for (const i of data.episode) {
        promises.push(this.getApiData(i));
      }
      Promise.all(promises)
      .then((data) => {
        let promises3 = [];
        for (const character of data) {
          promises3.push(character.characters);
        }
        return Promise.all(promises3)
      })
      .then((res)=>{
       // console.log(res)
       let arrayconcat = [];
       for (const key in res) {
        arrayconcat = arrayconcat.concat(res[key]);
       }
       return Promise.all(arrayconcat);
      })
      .then((data) => {
        let promises = [];
        for (const i of data) {
          promises.push(this.getApiData(i));
        }
        return Promise.all(promises);
      })
      .then((data) => {
        for (let i = 0; i < data.length; i++) {
          characterEpisodes[data[i].id] = { id: data[i].id, image: data[i].image };
        }
        let origins = [];
        for (const i of data) {
          if (i.origin.url === "") {
            origins.push({
              name: "Desconocido",
              url: "https://rickandmortyapi.com/api/location/6"
            });
          } else {
            origins.push(i.origin);
          }
        }
        return origins;
      })
      .then((data) => {
        let promises = [];
        for (const i of data) {
          promises.push(i.url);
        }
        return Promise.all(promises);
      })
      .then((data) => {
        let promises = [];
        for (const i of data) {
          promises.push(this.getApiData(i));
        }
        return Promise.all(promises);
      })
      .then((data) => {
        //console.log(data)
        let promises = [];
        for (const key in characterEpisodes) {
          promises.push(characterEpisodes[key]);
        }
  
        for (var i = 0; i < data.length; i++) {
          for (const key in promises) {
            promises[key].name = data[key].name;
            promises[key].type = data[key].type;
            promises[key].dimension = data[key].dimension;
          }
        }
        this.charactersList = promises;
      })
      .then((res)=>{
       
        // console.log(res)
        // console.log(characterEpisodes)
       })
    });
  }

  getApiData = (url: string) => {
    return new Promise((resolve, reject) => {
      fetch(url)
        .then((data) => {
          return data.json();
        })
        .then(resolve)
        .catch((error) => {
          console.log(url, error);
        });
    });
  };
}
