package com.imamultidev.galeria.service;

import com.imamultidev.galeria.model.Image;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

public interface ImageService {
    
    // Operaciones básicas CRUD
    Image save(MultipartFile file, String description) throws IOException;
    Image findById(Long id);
    List<Image> findAll();
    Image update(Long id, String name, String description) throws IOException;
    void delete(Long id) throws IOException;
    
    // Operaciones adicionales
    Image findByName(String name);
    boolean existsByName(String name);
    List<Image> findAllOrderByCreatedAtDesc();
} 