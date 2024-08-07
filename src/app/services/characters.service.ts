import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CharactersService {

  private apiUrl = 'https://rickandmortyapi.com/api';

  constructor(private http: HttpClient) { }

  getCharacters(numPage: number):Observable<any>{
    return this.http.get<any>(`${this.apiUrl}/character/?page=${numPage}`)
  }

  getCharacter(numPage:number, name: string):Observable<any>{
    return this.http.get<any>(`${this.apiUrl}/character/?page=${numPage}&name=${name}`)
  }
  
}
