import { makeAutoObservable } from "mobx";
import {IGameFavorite} from '../api/models';

class Favorites {
    favorites: IGameFavorite[] = [];

    constructor() {
        makeAutoObservable(this);
    }

    addGame = (favorite: IGameFavorite) => {
        this.favorites = [...this.favorites, favorite];
    }

    deleteGame = (id?: string) => {
        this.favorites = this.favorites.filter(favorite => favorite.id !== id);
    }
}

export default new Favorites();