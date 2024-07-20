import { Component, OnInit } from '@angular/core';
import { CharactersService } from '../../services/characters.service';
import { CommonModule } from '@angular/common';
import { LoadingComponent } from '../loading/loading.component';
import { FormsModule } from '@angular/forms';
import { FavoritesComponent } from '../favorites/favorites.component';
import { Character } from '../interfaces/character.interface';

@Component({
  selector: 'app-list-characters',
  standalone: true,
  imports: [CommonModule, LoadingComponent, FormsModule, FavoritesComponent],
  templateUrl: './list-characters.component.html',
  styleUrls: ['./list-characters.component.css']
})
export class ListCharactersComponent implements OnInit {

  characters: Character[] = [];
  numPage = 1;
  pages = 0;
  nextDisable = false;
  prevDisable = true;
  charactersCharged = false;
  input = '';

  constructor(private charactersService: CharactersService) {}

  ngOnInit(): void {
    this.getCharacters();
  }

  restartPage(): void {
    this.numPage = 1;
    this.getCharacters(); // Assuming you want to fetch characters after resetting page
  }

  getCharacters(): void {
    this.charactersCharged = false;

    const fetchCharacters$ = this.input === '' ?
      this.charactersService.getCharacters(this.numPage) :
      this.charactersService.getCharacter(this.numPage, this.input);

    fetchCharacters$.subscribe(
      res => {
        this.characters = res.results.map((character: Character) => ({
          ...character,
          showID: true,
          favorite: false
        }));
        this.pages = res.info.pages;

        // Ensure the animation completes before updating the state
        setTimeout(() => {
          this.charactersCharged = true;
          this.updatePaginationControls();
        }, 100); // Adjust the timeout duration if needed
      },
      error => {
        // Handle error
        console.error('Error fetching characters:', error);
        this.charactersCharged = false;
      }
    );
  }

  showID(character: Character): void {
    character.showID = !character.showID;
  }

  addFav(id: number): void {
    // Implement add to favorites functionality
  }

  btnNext(): void {
    if (this.numPage < this.pages) {
      this.numPage++;
      this.getCharacters();
    }
  }

  btnPrev(): void {
    if (this.numPage > 1) {
      this.numPage--;
      this.getCharacters();
    }
  }

  private updatePaginationControls(): void {
    this.prevDisable = this.numPage === 1;
    this.nextDisable = this.numPage >= this.pages;
  }
}