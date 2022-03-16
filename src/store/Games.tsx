import { makeAutoObservable, action } from 'mobx';
import { IGame, IGameConcrete } from '../api/models';
import { fetchingConcreteGame, fetchingGames } from '../api/rest';

class Games {
    games: IGame[] = [];
    game: IGameConcrete = {
        description: '',
        minimum_system_requirements: {
            os: '',
            processor: '',
            memory: '',
            graphics: '',
            storage: '',
        },
        screenshots: [],
        id: '',
        title: '',
        thumbnail: '',
        short_description: '',
        game_url: '',
        genre: '',
        platform: '',
        publisher: '',
        developer: '',
        release_date: '',
        freetogame_profile_url: '',
    };
    error: string = '';
    loading: boolean = false;
    loadingConcreteGame: boolean = false;

    constructor() {
        makeAutoObservable(this);
    }

    setGame = (data: IGameConcrete) => {
        this.game = data;
    };

    setGames = (data: IGame[]) => {
        this.games = data.slice(100, 110);
    };

    getGame = (id?: string) => {
        this.loadingConcreteGame = true;
        fetchingConcreteGame(id).then(
            action('fetchingSuccsess', (data) => {
                this.setGame(data);
                this.loadingConcreteGame = false;
            }),
            action('fetchingError', (msgError) => {
                this.error = msgError;
            })
        );
    };

    getGames = () => {
        this.loading = true;
        fetchingGames().then(
            action('fetchingSuccsess', (data) => {
                this.setGames(data);
                this.loading = false;
            }),
            action('fetchingError', (msgError) => {
                this.error = msgError;
            })
        );
    };
}

export default new Games();
