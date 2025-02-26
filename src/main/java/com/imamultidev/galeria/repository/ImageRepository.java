package com.imamultidev.galeria.repository;

import com.imamultidev.galeria.model.Image;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ImageRepository extends JpaRepository<Image, Long> {
    
    // Buscar por nombre (ignorando mayúsculas y minúsculas)
    Optional<Image> findByNameIgnoreCase(String name);
    
    // Buscar por publicId de Cloudinary
    Optional<Image> findByPublicId(String publicId);
    
    // Listar imágenes ordenadas por fecha de creación descendente
    List<Image> findAllByOrderByCreatedAtDesc();
    
    // Verificar si existe una imagen con ese nombre
    boolean existsByNameIgnoreCase(String name);
} 