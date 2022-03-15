import { IGame, IGameConcrete } from "./models"

export const fetchingGames = async (): Promise<IGame[]> => {
    try {
        const res = await fetch('https://free-to-play-games-database.p.rapidapi.com/api/games', {
            method: 'GET',
            headers: {
                'x-rapidapi-host': 'free-to-play-games-database.p.rapidapi.com',
                'x-rapidapi-key': '625b5a3057mshfba83efd2980e15p135b95jsn66167d34e1d8',
            },
        });
        const data = await res.json();
        return data;
    } catch (e: any) {
        return e.message;
    }
};

export const fetchingConcreteGame = async (id?: string): Promise<IGameConcrete> => {
    try {
        const res = await fetch(`https://free-to-play-games-database.p.rapidapi.com/api/game?id=${id}`, {
            method: 'GET',
            headers: {
                'x-rapidapi-host': 'free-to-play-games-database.p.rapidapi.com',
                'x-rapidapi-key': '625b5a3057mshfba83efd2980e15p135b95jsn66167d34e1d8',
            },
        });
        const data = await res.json();
        return data;
    } catch (e: any) {
        return e.message;
    }
}