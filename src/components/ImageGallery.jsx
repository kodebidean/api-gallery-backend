import { useState } from 'react';
import { Box, Grid, Typography, CircularProgress } from '@mui/material';
import { useImages } from '../services/imageService';
import ImageCard from './ImageCard';
import UploadForm from './UploadForm';
import SearchBar from './SearchBar';

const ImageGallery = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const { data: images, isLoading, error } = useImages();

    if (isLoading) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
                <CircularProgress />
            </Box>
        );
    }

    if (error) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
                <Typography color="error">Error al cargar las imágenes: {error.message}</Typography>
            </Box>
        );
    }

    const filteredImages = images?.filter(image => 
        image.name.toLowerCase().includes(searchTerm.toLowerCase())
    ) || [];

    return (
        <Box sx={{ p: 3 }}>
            <Typography variant="h4" gutterBottom>
                Galería de Imágenes
            </Typography>
            
            <Box sx={{ mb: 3 }}>
                <SearchBar value={searchTerm} onChange={setSearchTerm} />
            </Box>
            
            <Box sx={{ mb: 3 }}>
                <UploadForm />
            </Box>

            <Grid container spacing={3}>
                {filteredImages.map((image) => (
                    <Grid item xs={12} sm={6} md={4} lg={3} key={image.id}>
                        <ImageCard image={image} />
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
};

export default ImageGallery; 