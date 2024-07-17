import { Component } from '@angular/core';
import { CharactersService } from '../../services/characters.service';
import { CommonModule } from '@angular/common';
import { LoadingComponent } from '../loading/loading.component';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-list-characters',
  standalone: true,
  imports: [CommonModule, LoadingComponent, FormsModule],
  templateUrl: './list-characters.component.html',
  styleUrl: './list-characters.component.css'
})
export class ListCharactersComponent {

  characters: any[] = [];
  allCharacters: any[] = []
  numPage: number = 1;
  nextDisable: boolean = false;
  prevDisable: boolean = false;
  visibility: string = 'visibility';
  star: string = 'star'
  charactersCharged: boolean = false;

  constructor(private charactersService: CharactersService){}

  ngOnInit(){
    this.getCharacters();
  }

  searchCharacter(){
    
  }

  async getCharacters(){
    this.charactersCharged = false;
    return this.charactersService.getCharacters(this.numPage).subscribe(
      res => {
        this.characters = res.results
        setTimeout(() =>{
          this.charactersCharged = true
        },1)
        
      }
    )
  }

  btnVisibility(){
    if(this.visibility == 'visibility'){
      this.visibility = 'visibility_off'
    }else{
      this.visibility = 'visibility'
    }
  }

  btnNext(){

    this.prevDisable = false;

    if(this.numPage < 41){
      this.numPage += 1;
      this.getCharacters()
    }else if(this.numPage === 41){
      this.numPage += 1
      this.nextDisable = true
      this.getCharacters()
    }

  }

  btnPrev(){

    this.nextDisable = false

    if(this.numPage > 2){
      this.numPage -= 1;
      this.getCharacters()
    }else if(this.numPage === 2){
      this.numPage -= 1
      this.prevDisable = true
      this.getCharacters()
    }
  }

}