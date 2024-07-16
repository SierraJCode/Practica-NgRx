import { Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { CharactersComponent } from './components/characters/characters.component';

export const routes: Routes = [
    {
        path: '',
        component:CharactersComponent
    }
];
