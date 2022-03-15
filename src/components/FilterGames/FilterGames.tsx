import { Box, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent, TextField } from '@mui/material';

interface IProps {
    handleChangeGenre: (event: SelectChangeEvent) => void;
    handleChangeSort: (event: SelectChangeEvent) => void;
    handleChangeSearchGame: (event: React.ChangeEvent<HTMLInputElement>) => void;
    sortGame: string;
    genre: string;
}

const FilterGames: React.FC<IProps> = ({ handleChangeGenre, handleChangeSort, handleChangeSearchGame, sortGame, genre }) => {
    return (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <FormControl variant="standard" fullWidth sx={{ width: 200, marginTop: 2 }}>
                <InputLabel>Genre</InputLabel>
                <Select label="Genre" onChange={handleChangeGenre} value={genre}>
                    <MenuItem value="All">All</MenuItem>
                    <MenuItem value="MMORPG">MMORPG</MenuItem>
                    <MenuItem value="Shooter">Shooter</MenuItem>
                    <MenuItem value="Card Game">Card Game</MenuItem>
                    <MenuItem value="MOBA">MOBA</MenuItem>
                </Select>
            </FormControl>
            <FormControl variant="standard" fullWidth sx={{ width: 200, marginTop: 2, marginLeft: 2 }}>
                <InputLabel>Sort</InputLabel>
                <Select label="Sort" onChange={handleChangeSort} value={sortGame}>
                    <MenuItem value="Asc">Asc</MenuItem>
                    <MenuItem value="Desc">Desc</MenuItem>
                </Select>
            </FormControl>
            <TextField
                onChange={handleChangeSearchGame}
                label="Search game"
                variant="standard"
                sx={{ alignSelf: 'self-end', marginLeft: '16px' }}
            />
        </Box>
    );
};

export default FilterGames;
