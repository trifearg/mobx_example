import { Box, Card, CardActionArea, CardContent, CardMedia, Chip } from '@mui/material';
import { IGame } from '../../api/models';

interface IProps extends IGame {
    modalOpen: () => void;
    getGame: (id?: string) => void;
}

const CardGame: React.FC<IProps> = ({
    id,
    title,
    thumbnail,
    short_description,
    genre,
    platform,
    publisher,
    developer,
    release_date,
    modalOpen,
    getGame,
}) => {
    const openConcreteGame = (id: string) => {
        getGame(id);
        modalOpen();
    };

    return (
        <Card sx={{ margin: 2, flex: '0 0 16%', alignSelf: 'stretch', minWidth: '300px', backgroundColor: '#eeeeee' }}>
            <CardActionArea onClick={() => openConcreteGame(id)}>
                <CardMedia component="img" height="auto" image={thumbnail} alt="img" />
                <CardContent>
                    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                        <div style={{ marginBottom: 5 }}>
                            <h1 style={{ display: 'inline', marginBottom: 5, fontSize: '25px' }}>{title}</h1>
                        </div>
                        <div style={{ display: 'inline', marginBottom: 5, textAlign: 'justify' }}>
                            <span style={{ fontWeight: 'bold' }}>Short description:</span> <span>{short_description}</span>
                        </div>
                        <div style={{ display: 'inline', marginBottom: 5 }}>
                            <span style={{ fontWeight: 'bold' }}>Date: </span><span>{release_date}</span>
                        </div>
                        <div style={{ display: 'flex', flexWrap: 'wrap', marginBottom: 5 }}>
                            <Chip size="small" sx={{ margin: '2px', '& .MuiChip-label': { fontSize: '14px' } }} label={genre} variant="outlined" />
                            <Chip size="small" sx={{ margin: '2px', '& .MuiChip-label': { fontSize: '14px' }}} label={platform} variant="outlined" />
                            <Chip size="small" sx={{ margin: '2px', '& .MuiChip-label': { fontSize: '14px' }}} label={publisher} variant="outlined" />
                            <Chip size="small" sx={{ margin: '2px', '& .MuiChip-label': { fontSize: '14px' }}} label={developer} variant="outlined" />
                        </div>
                    </Box>
                </CardContent>
            </CardActionArea>
        </Card>
    );
};

export default CardGame;
