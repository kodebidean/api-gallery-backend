import { useState } from 'react';
import { 
    Box, 
    Button, 
    TextField, 
    Paper,
    Typography,
    CircularProgress
} from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { useUploadImage } from '../services/imageService';
import { toast } from 'react-hot-toast';

const UploadForm = () => {
    const [file, setFile] = useState(null);
    const [description, setDescription] = useState('');
    const [preview, setPreview] = useState('');
    const uploadImage = useUploadImage();

    const handleFileChange = (event) => {
        const selectedFile = event.target.files[0];
        if (selectedFile) {
            setFile(selectedFile);
            // Crear preview de la imagen
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreview(reader.result);
            };
            reader.readAsDataURL(selectedFile);
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!file) {
            toast.error('Por favor selecciona una imagen');
            return;
        }

        const formData = new FormData();
        formData.append('file', file);
        if (description) {
            formData.append('description', description);
        }

        try {
            await uploadImage.mutateAsync(formData);
            toast.success('Imagen subida correctamente');
            // Limpiar formulario
            setFile(null);
            setDescription('');
            setPreview('');
        } catch (error) {
            toast.error('Error al subir la imagen');
        }
    };

    return (
        <Paper sx={{ p: 3, mb: 3 }}>
            <form onSubmit={handleSubmit}>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                    <Typography variant="h6">Subir Nueva Imagen</Typography>
                    
                    <Button
                        variant="outlined"
                        component="label"
                        startIcon={<CloudUploadIcon />}
                    >
                        Seleccionar Imagen
                        <input
                            type="file"
                            hidden
                            accept="image/*"
                            onChange={handleFileChange}
                        />
                    </Button>

                    {preview && (
                        <Box sx={{ mt: 2 }}>
                            <img 
                                src={preview} 
                                alt="Preview" 
                                style={{ 
                                    maxWidth: '200px', 
                                    maxHeight: '200px',
                                    objectFit: 'contain' 
                                }} 
                            />
                        </Box>
                    )}

                    <TextField
                        multiline
                        rows={3}
                        label="Descripción"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />

                    <Button 
                        type="submit" 
                        variant="contained" 
                        disabled={!file || uploadImage.isLoading}
                    >
                        {uploadImage.isLoading ? (
                            <CircularProgress size={24} />
                        ) : (
                            'Subir Imagen'
                        )}
                    </Button>
                </Box>
            </form>
        </Paper>
    );
};

export default UploadForm; 