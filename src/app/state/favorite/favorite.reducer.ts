import { createReducer, on, Action } from "@ngrx/store";
import { addFav, removeFav } from "./favorite.actions";
import { Character } from "../../components/interfaces/character.interface";

export const initialState: Character[] = [];

const _favoriteReducer = createReducer(
    initialState,
    on(addFav, (state, {character}) => [...state, character]),
    on(removeFav, (state, { id }) => state.filter(character => character.id !== id))
);

export function favoriteReducer(state: Character[] | undefined, action: Action){
    return _favoriteReducer(state, action);
}