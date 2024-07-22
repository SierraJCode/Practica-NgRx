import { createAction, props } from "@ngrx/store";

export const addFav = createAction('[listCharacters] Add to favorite')
export const removeFav = createAction('[listCharacters] Remove to favorite', props<CharacterData>())