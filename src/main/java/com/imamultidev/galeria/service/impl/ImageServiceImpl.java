package com.imamultidev.galeria.service.impl;

import com.imamultidev.galeria.model.Image;
import com.imamultidev.galeria.repository.ImageRepository;
import com.imamultidev.galeria.service.CloudinaryService;
import com.imamultidev.galeria.service.ImageService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;

import com.imamultidev.galeria.exception.ResourceNotFoundException;
import com.imamultidev.galeria.exception.CloudinaryException;

@Service
@RequiredArgsConstructor
@Transactional
public class ImageServiceImpl implements ImageService {

    private final ImageRepository imageRepository;
    private final CloudinaryService cloudinaryService;
    
    @Override
    public Image save(MultipartFile file, String description) throws IOException {
        try {
            Map<String, String> uploadResult = cloudinaryService.upload(file);
            
            // Crear nueva imagen
            Image image = new Image();
            image.setName(file.getOriginalFilename());
            image.setUrl(uploadResult.get("url"));
            image.setPublicId(uploadResult.get("publicId"));
            image.setDescription(description);
            image.setFileSize(file.getSize());
            image.setContentType(file.getContentType());
            image.setCreatedAt(LocalDateTime.now());
            
            return imageRepository.save(image);
        } catch (IOException e) {
            throw new CloudinaryException("Error al subir la imagen a Cloudinary", e);
        }
    }

    @Override
    @Transactional(readOnly = true)
    public Image findById(Long id) {
        return imageRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Imagen no encontrada con ID: " + id));
    }

    @Override
    @Transactional(readOnly = true)
    public List<Image> findAll() {
        return imageRepository.findAll();
    }

    @Override
    public Image update(Long id, String name, String description) throws IOException {
        Image image = findById(id);
        if (name != null && !name.isEmpty()) {
            image.setName(name);
        }
        if (description != null) {
            image.setDescription(description);
        }
        return imageRepository.save(image);
    }

    @Override
    public void delete(Long id) throws IOException {
        try {
            Image image = findById(id);
            cloudinaryService.delete(image.getPublicId());
            imageRepository.delete(image);
        } catch (IOException e) {
            throw new CloudinaryException("Error al eliminar la imagen de Cloudinary", e);
        }
    }

    @Override
    @Transactional(readOnly = true)
    public Image findByName(String name) {
        return imageRepository.findByNameIgnoreCase(name)
                .orElseThrow(() -> new RuntimeException("Imagen no encontrada con nombre: " + name));
    }

    @Override
    @Transactional(readOnly = true)
    public boolean existsByName(String name) {
        return imageRepository.existsByNameIgnoreCase(name);
    }

    @Override
    @Transactional(readOnly = true)
    public List<Image> findAllOrderByCreatedAtDesc() {
        return imageRepository.findAllByOrderByCreatedAtDesc();
    }
} 