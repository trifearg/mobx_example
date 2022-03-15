import { Box } from '@mui/material';
import { IGame } from '../../api/models';
import CardGame from '../CardGame/CardGame';

interface IProps {
    games: IGame[];
    modalOpen: () => void;
    getGame: (id?: string) => void;
}

const CardGameList: React.FC<IProps> = ({ games, modalOpen, getGame }) => {
    return (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexWrap: 'wrap' }}>
            {games.map((game) => (
                <CardGame key={game.id} {...game} modalOpen={modalOpen} getGame={getGame} />
            ))}
        </Box>
    );
};

export default CardGameList;
