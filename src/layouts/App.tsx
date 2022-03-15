import { observer } from 'mobx-react-lite';
import { useEffect, useState } from 'react';
import { createGlobalStyle } from 'styled-components';
import games from '../store/Games';
import modal from '../store/Modal';
import favorites from '../store/Favorites';
import { IGame } from '../api/models';
import CardGameList from '../components/CardGameList/CardGameList';
import { Badge, Box, CircularProgress, IconButton, SelectChangeEvent, Tooltip } from '@mui/material';
import Portal from '../components/Portal/Portal';
import CardGamePopup from '../components/CardGamePopup/CardGamePopup';
import FilterGames from '../components/FilterGames/FilterGames';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteDrawer from '../components/FavoriteDrawer/FavoriteDrawer';

const AppStyle = createGlobalStyle`
  * {
    font-family: 'Quicksand', sans-serif;
    font-size: 20px;
  }

  body {
    background-color: #e0e0e0;
    height: 100%;
    width: 100%;
    box-sizing: border-box;
    display: flex;
    margin: 0;
    padding: 0;
    font-family: 'Montserrat', sans-serif;
    justify-content: center;
    align-items: center
  }
`;

const App: React.FC = observer(() => {
    const [filteredItems, setFilteredItems] = useState<IGame[]>([]);
    const [genre, setGenre] = useState<string>('');
    const [sortGame, setSortGame] = useState<string>('');
    const [searchGame, setSearchGame] = useState<string>('');

    useEffect(() => {
        games.getGames();
    }, []);

    useEffect(() => {
        setFilteredItems(games.games.filter((game) => game.genre === genre));
    }, [genre]);

    useEffect(() => {
        if (sortGame === 'Asc') {
            setFilteredItems(
                games.games.sort((a, b) => new Date(a.release_date).valueOf() - new Date(b.release_date).valueOf())
            );
        }

        if (sortGame === 'Desc') {
            setFilteredItems(
                games.games.sort((a, b) => new Date(b.release_date).valueOf() - new Date(a.release_date).valueOf())
            );
        }
    }, [sortGame]);

    useEffect(() => {
        const results = games.games.filter((game) => game.title.toLowerCase().includes(searchGame.toLowerCase()));
        setFilteredItems(results);
    }, [searchGame]);

    if (games.loading) {
        return <CircularProgress color="inherit" sx={{ position: 'fixed', left: '50%', top: '50%' }} />;
    }

    if (games.error) {
        return <h1 style={{ position: 'fixed', left: '50%', top: '50%' }}>{games.error}</h1>;
    }

    const handleChangeGenre = (event: SelectChangeEvent) => {
        setGenre(event.target.value as string);
    };

    const handleChangeSort = (event: SelectChangeEvent) => {
        setSortGame(event.target.value as string);
    };

    const handleChangeSearchGame = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchGame(event.target.value);
    };

    return (
        <>
            <AppStyle />
            <Box
                sx={{
                    maxWidth: '1280px',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    margin: '0 auto',
                }}
            >
                <FilterGames
                    handleChangeGenre={handleChangeGenre}
                    handleChangeSort={handleChangeSort}
                    sortGame={sortGame}
                    genre={genre}
                    handleChangeSearchGame={handleChangeSearchGame}
                />
                <Box sx={{ alignSelf: 'end' }}>
                    <Tooltip title="Favorites">
                        <IconButton onClick={modal.openDrawer}>
                            <Badge badgeContent={ favorites.favorites.length ? favorites.favorites.length : null } color="primary">
                                <FavoriteBorderIcon />
                            </Badge>
                        </IconButton>
                    </Tooltip>
                </Box>
            </Box>
            <CardGameList
                games={filteredItems.length ? filteredItems : games.games}
                modalOpen={modal.open}
                getGame={games.getGame}
            />
            <FavoriteDrawer
                favorites={favorites.favorites}
                closeDrawer={modal.closeDrawer}
                deleteGame={favorites.deleteGame}
                isOpenDrawer={modal.isOpenDrawer}
            />
            <Portal isOpen={modal.isOpen} modalClose={modal.close}>
                <CardGamePopup
                    game={games.game}
                    loadingGame={games.loadingConcreteGame}
                    error={games.error}
                    addGame={favorites.addGame}
                    modalClose={modal.close}
                />
            </Portal>
        </>
    );
});

export default App;
