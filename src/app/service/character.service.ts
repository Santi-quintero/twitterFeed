import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { Character } from '../models/character';

@Injectable({
  providedIn: 'root'
})
export class CharacterService {

  URL = environment.URLCharacters;

  constructor(private httpClient: HttpClient) { }


  public list(): Observable<any>{
    return this.httpClient.get<any>(this.URL)

  }

  public search(name : string): Observable<any>{
    return this.httpClient.get<any>(`${this.URL}?name=${name}`)
    }

  public detail(id: number): Observable<Character>{
    return this.httpClient.get<Character>(`${this.URL}/${id}`)
  }

  public detailCharacterEpisode(id:number): Observable<any>{
    return this.httpClient.get<any>(`${this.URL}/${id}`).pipe(map(response => response.episode[0]));
  }
  public episodes(id:number): Observable<any>{
    return this.httpClient.get<any>(`${this.URL}/${id}`);
  }
}