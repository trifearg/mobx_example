import { Button, Drawer } from '@mui/material';
import { IGameFavorite } from '../../api/models';
import frogImg from '../../img/frog.jpg';

interface IProps {
    favorites: IGameFavorite[];
    isOpenDrawer: boolean;
    closeDrawer: () => void;
    deleteGame: (id?: string) => void;
}

const FavoriteDrawer: React.FC<IProps> = ({ isOpenDrawer, closeDrawer, favorites, deleteGame }) => {
    return (
        <Drawer anchor={'right'} open={isOpenDrawer} onClose={closeDrawer}>
            {favorites.length ? (
                favorites.map((favorite) => (
                    <div
                        key={favorite.id}
                        style={{ borderBottom: '1px solid gray', boxShadow: '1px 1px 5px grey', marginBottom: 10 }}
                    >
                        <img src={favorite.thumbnail} alt="img" />
                        <h1 style={{ paddingLeft: 5 }}>{favorite.title}</h1>
                        <div style={{ paddingRight: 5, display: 'flex', justifyContent: 'end' }}>
                            <Button
                                type="button"
                                variant="outlined"
                                size="small"
                                sx={{ marginBottom: 1 }}
                                onClick={() => deleteGame(favorite.id)}
                            >
                                Delete
                            </Button>
                        </div>
                    </div>
                ))
            ) : (
                <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', margin: 20, height: '100%'}}>
                    <img src={frogImg} alt="frog" style={{width: 150}} />
                    <h1>You don't have favorite games :(</h1>
                </div>
            )}
        </Drawer>
    );
};

export default FavoriteDrawer;
