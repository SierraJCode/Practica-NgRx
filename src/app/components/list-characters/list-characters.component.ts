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
  numPage: number = 1;
  pages: number = 0
  nextDisable: boolean = false;
  prevDisable: boolean = true;
  visibility: string = 'visibility';
  star: string = 'star'
  charactersCharged: boolean = false;
  input: string = ''

  constructor(private charactersService: CharactersService){}

  ngOnInit(){
    this.getCharacters();
  }

  async restartPage(){
    this.numPage = 1
    // if(this.numPage == this.pages){
    //   this.nextDisable = true;
    //   this.prevDisable = true;
    // }else{
    //   this.nextDisable = false;
    // }
  }

  async getCharacters(){
    if (this.input === ''){
      this.charactersCharged = false;
      return this.charactersService.getCharacters(this.numPage).subscribe(
        res => {
          this.characters = res.results
          this.pages = res.info.pages;
          setTimeout(() =>{
            this.charactersCharged = true
          },1)
        }
      )
    } else {
      this.charactersCharged = false;
      return this.charactersService.getCharacter(this.numPage, this.input).subscribe(
        res => {
          this.pages = res.info.pages;
          this.characters = res.results
          setTimeout(() =>{
            this.charactersCharged = true
          },1)
        }
      )
    }
  }

  btnVisibility(){
    if(this.visibility == 'visibility'){
      this.visibility = 'visibility_off'
    }else{
      this.visibility = 'visibility'
    }
  }

  btnNext(){
    if(this.numPage < this.pages-1){
      this.numPage += 1;
      this.prevDisable = false;
      this.getCharacters()
    }else if(this.numPage === this.pages-1){
      this.numPage += 1
      this.nextDisable = true
      this.getCharacters()
    }

  }

  btnPrev(){
    if(this.numPage > 2){
      this.numPage -= 1;
      this.nextDisable = false
      this.getCharacters()
    }else if(this.numPage === 2){
      this.numPage -= 1
      this.prevDisable = true
      this.getCharacters()
    }
  }

}