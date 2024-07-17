import { Component } from '@angular/core';
import { CharactersService } from '../../services/characters.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-list-characters',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './list-characters.component.html',
  styleUrl: './list-characters.component.css'
})
export class ListCharactersComponent {

  characters: any[] = [];

  constructor(private charactersService: CharactersService){}

  ngOnInit(){
    this.getCharacters();
  }
  
  getCharacters(){
    return this.charactersService.getCharacters().subscribe(
      res => console.log(res)
    )
  }

}
