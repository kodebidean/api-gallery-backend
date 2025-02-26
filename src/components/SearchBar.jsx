import { TextField, InputAdornment } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

const SearchBar = ({ value, onChange }) => {
    return (
        <TextField
            fullWidth
            variant="outlined"
            placeholder="Buscar imágenes..."
            value={value}
            onChange={(e) => onChange(e.target.value)}
            InputProps={{
                startAdornment: (
                    <InputAdornment position="start">
                        <SearchIcon />
                    </InputAdornment>
                ),
            }}
        />
    );
};

export default SearchBar; 