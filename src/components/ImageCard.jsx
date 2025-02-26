import { useState } from 'react';
import { Card, CardMedia, CardContent, CardActions, Typography, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { useDeleteImage } from '../services/imageService';
import ImageModal from './ImageModal';

const ImageCard = ({ image }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const deleteImage = useDeleteImage();

    const handleDelete = () => {
        if (window.confirm('¿Estás seguro de que quieres eliminar esta imagen?')) {
            deleteImage.mutate(image.id);
        }
    };

    return (
        <>
            <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                <CardMedia
                    component="img"
                    height="200"
                    image={image.url}
                    alt={image.name}
                    sx={{ cursor: 'pointer', objectFit: 'cover' }}
                    onClick={() => setIsModalOpen(true)}
                />
                <CardContent sx={{ flexGrow: 1 }}>
                    <Typography gutterBottom variant="h6" component="div">
                        {image.name}
                    </Typography>
                    {image.description && (
                        <Typography variant="body2" color="text.secondary">
                            {image.description}
                        </Typography>
                    )}
                </CardContent>
                <CardActions>
                    <IconButton onClick={handleDelete} color="error">
                        <DeleteIcon />
                    </IconButton>
                </CardActions>
            </Card>

            <ImageModal
                open={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                image={image}
            />
        </>
    );
};

export default ImageCard; 