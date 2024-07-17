import { Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { ListCharactersComponent } from './components/list-characters/list-characters.component';

export const routes: Routes = [
    {
        path: '',
        component:ListCharactersComponent
    }
];
