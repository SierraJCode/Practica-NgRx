import { Component } from '@angular/core';
import { CharactersService } from '../../services/characters.service';
import { CommonModule } from '@angular/common';
import { LoadingComponent } from '../loading/loading.component';
import { FormsModule } from '@angular/forms';
import { FavoritesComponent } from '../favorites/favorites.component';
import { Character } from '../interfaces/character.interface';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { addFav, removeFav } from '../../state/favorite/favorite.actions';

@Component({
  selector: 'app-list-characters',
  standalone: true,
  imports: [CommonModule, LoadingComponent, FormsModule, FavoritesComponent],
  templateUrl: './list-characters.component.html',
  styleUrls: ['./list-characters.component.css']
})
export class ListCharactersComponent {
  characters: Character[] = [];
  numPage: number = 1;
  pages: number = 0;
  nextDisable: boolean = false;
  prevDisable: boolean = true;
  star: string = 'star';
  charactersCharged: boolean = false;
  input: string = '';
  characters$: Observable<Character[]>;

  constructor(
    private charactersService: CharactersService, 
    private store: Store<{ characters: Character[] }>){
      this.characters$ = store.select('characters')
    }

  ngOnInit() {
    this.getCharacters();
  }

  restartPage() {
    this.numPage = 1;
    this.getCharacters();
  }

  getCharacters() {
    this.charactersCharged = false;
    const request = this.input === '' 
      ? this.charactersService.getCharacters(this.numPage)
      : this.charactersService.getCharacter(this.numPage, this.input);

    request.subscribe(res => {
      this.characters = res.results.map((character: Character) => ({
        ...character,
        showID: true,
        favorite: false,
      }));
      this.pages = res.info.pages;
      setTimeout(() => {
        this.charactersCharged = true;
      }, 1);
    });
  }

  showID(character: Character) {
    character.showID = !character.showID;
  }

  addFav(character: Character) {
    character.favorite = true
    this.store.dispatch(addFav({ character }));
    alert('Add')
  }
  
  removeFav(character: Character, id: number) {
    character.favorite = false
    this.store.dispatch(removeFav({ id }));
    alert('Remove')
  }

  btnNext() {
    if (this.numPage < this.pages) {
      this.numPage++;
      this.prevDisable = this.numPage === 1;
      this.nextDisable = this.numPage === this.pages;
      this.getCharacters();
    }
  }

  btnPrev() {
    if (this.numPage > 1) {
      this.numPage--;
      this.prevDisable = this.numPage === 1;
      this.nextDisable = this.numPage === this.pages;
      this.getCharacters();
    }
  }
}
