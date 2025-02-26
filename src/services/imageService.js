import axios from 'axios';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

const API_URL = 'http://localhost:9090/api/images';

// Funciones base de API
const api = {
    getAllImages: async () => {
        const response = await axios.get(API_URL);
        return response.data;
    },

    uploadImage: async (formData) => {
        const response = await axios.post(API_URL, formData);
        return response.data;
    },

    deleteImage: async (id) => {
        await axios.delete(`${API_URL}/${id}`);
    },

    searchImages: async (name) => {
        const response = await axios.get(`${API_URL}/search?name=${name}`);
        return response.data;
    }
};

// Hooks personalizados
export const useImages = () => {
    return useQuery({
        queryKey: ['images'],
        queryFn: api.getAllImages
    });
};

export const useUploadImage = () => {
    const queryClient = useQueryClient();
    
    return useMutation({
        mutationFn: api.uploadImage,
        onSuccess: () => {
            queryClient.invalidateQueries(['images']);
        }
    });
};

export const useDeleteImage = () => {
    const queryClient = useQueryClient();
    
    return useMutation({
        mutationFn: api.deleteImage,
        onSuccess: () => {
            queryClient.invalidateQueries(['images']);
        }
    });
};

export const useSearchImages = (name) => {
    return useQuery({
        queryKey: ['images', 'search', name],
        queryFn: () => api.searchImages(name),
        enabled: !!name
    });
}; 