import { IGameConcrete, IGameFavorite } from '../../api/models';
import Carousel from 'react-material-ui-carousel';
import { Box, CircularProgress, Link, Button } from '@mui/material';
import { v4 as uuidv4 } from 'uuid';

interface IProps {
    game: IGameConcrete;
    loadingGame: boolean;
    error: string;
    addGame: (favorite: IGameFavorite) => void;
    modalClose: () => void;
}

const CardGamePopup: React.FC<IProps> = ({ game, loadingGame, error, addGame, modalClose }) => {
    if (loadingGame) {
        return (
            <Box
                sx={{
                    minWidth: '500px',
                    minHeight: '500px',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
            >
                <CircularProgress color="inherit" />
            </Box>
        );
    }

    if (error) {
        return <h1 style={{ position: 'fixed', left: '50%', top: '50%' }}>{error}</h1>;
    }

    const eventChangeAddGame = () => {
        const uniqueId = uuidv4();
        const obj = {
            id: game.id + uniqueId,
            thumbnail: game.thumbnail,
            title: game.title
        }
        addGame(obj);
        modalClose();
    }

    return (
        <Box sx={{ width: '500px', minHeight: '500px' }}>
            <Carousel sx={{ height: '250px', width: '100%' }} animation="slide" indicators={false} navButtonsAlwaysVisible>
                {game.screenshots.map((scrn) => (
                    <img key={scrn.id} height="auto" width="100%" src={scrn.image} alt="img" />
                ))}
            </Carousel>
            <Box sx={{ flexDirection: 'column', margin: '15px' }}>
                <div style={{ textAlign: 'justify' }}>
                    <span style={{ fontWeight: 'bold' }}>Description: </span>
                    <span style={{ fontSize: '15px' }}>{game.description}</span>
                </div>

                <div style={{ marginTop: '15px' }}>
                    <span style={{ fontWeight: 'bold' }}>System recomendation: </span>
                    <br />
                    <span style={{ fontSize: '15px' }}>
                        Graphics:{' '}
                        {game.minimum_system_requirements.graphics ? game.minimum_system_requirements.graphics : `None`}
                    </span>
                    <br />
                    <span style={{ fontSize: '15px' }}>
                        Memory: {game.minimum_system_requirements.memory ? game.minimum_system_requirements.memory : 'None'}
                    </span>
                    <br />
                    <span style={{ fontSize: '15px' }}>
                        OS: {game.minimum_system_requirements.os ? game.minimum_system_requirements.os : 'None'}
                    </span>
                    <br />
                    <span style={{ fontSize: '15px' }}>
                        Processor:{' '}
                        {game.minimum_system_requirements.processor ? game.minimum_system_requirements.processor : 'None'}
                    </span>
                    <br />
                    <span style={{ fontSize: '15px' }}>
                        Storage:{' '}
                        {game.minimum_system_requirements.storage ? game.minimum_system_requirements.storage : 'None'}
                    </span>
                </div>

                <div style={{ marginTop: '15px', paddingBottom: '15px' }}>
                    <span style={{ fontWeight: 'bold' }}>Link: </span>
                    <Link
                        sx={{ fontSize: '15px' }}
                        href={game.freetogame_profile_url}
                        underline="hover"
                        target="_blank"
                        rel="noreferrer"
                    >
                        {game.freetogame_profile_url}
                    </Link>
                </div>
                <Button variant="outlined" sx={{marginBottom: 1, width: '100%'}} onClick={() => eventChangeAddGame()} >Add favorite</Button>
            </Box>
        </Box>
    );
};

export default CardGamePopup;
