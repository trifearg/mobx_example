export interface IGame {
    id: string;
    title: string;
    thumbnail: string;
    short_description: string;
    game_url: string;
    genre: string;
    platform: string;
    publisher: string;
    developer: string;
    release_date: string;
    freetogame_profile_url: string;
}

export interface IGameConcrete extends IGame {
    description: string;
    minimum_system_requirements: {
        os: string;
        processor: string;
        memory: string;
        graphics: string;
        storage: string;
    };
    screenshots: Array<{ id: string; image: string }>;
}

export interface IGameFavorite {
    id: string;
    title: string;
    thumbnail: string;
}