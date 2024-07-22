import { createAction, props } from "@ngrx/store";
import { Character } from "../../components/interfaces/character.interface";

export const addFav = createAction('[listCharacters] Add to favorite', props<{ character:Character }>())
export const removeFav = createAction('[listCharacters] Remove to favorite', props<{ id:number }>())