package com.imamultidev.galeria.controller;

import com.imamultidev.galeria.dto.ImageDTO;
import com.imamultidev.galeria.model.Image;
import com.imamultidev.galeria.service.ImageService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/images")
@RequiredArgsConstructor
@Tag(name = "Image Controller", description = "API para gestionar imágenes")
@CrossOrigin(origins = "*")
public class ImageController {

    private final ImageService imageService;

    @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    @Operation(summary = "Subir una nueva imagen")
    public ResponseEntity<ImageDTO> uploadImage(
            @RequestParam("file") MultipartFile file,
            @RequestParam(value = "description", required = false) String description) throws IOException {
        Image savedImage = imageService.save(file, description);
        return new ResponseEntity<>(ImageDTO.fromEntity(savedImage), HttpStatus.CREATED);
    }

    @GetMapping
    @Operation(summary = "Obtener todas las imágenes")
    public ResponseEntity<List<ImageDTO>> getAllImages() {
        List<ImageDTO> images = imageService.findAllOrderByCreatedAtDesc()
                .stream()
                .map(ImageDTO::fromEntity)
                .collect(Collectors.toList());
        return ResponseEntity.ok(images);
    }

    @GetMapping("/{id}")
    @Operation(summary = "Obtener una imagen por ID")
    public ResponseEntity<ImageDTO> getImage(@PathVariable Long id) {
        Image image = imageService.findById(id);
        return ResponseEntity.ok(ImageDTO.fromEntity(image));
    }

    @PutMapping("/{id}")
    @Operation(summary = "Actualizar una imagen existente")
    public ResponseEntity<ImageDTO> updateImage(
            @PathVariable Long id,
            @RequestParam(required = false) String name,
            @RequestParam(required = false) String description) throws IOException {
        Image updatedImage = imageService.update(id, name, description);
        return ResponseEntity.ok(ImageDTO.fromEntity(updatedImage));
    }

    @DeleteMapping("/{id}")
    @Operation(summary = "Eliminar una imagen")
    public ResponseEntity<Void> deleteImage(@PathVariable Long id) throws IOException {
        imageService.delete(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/search")
    @Operation(summary = "Buscar imagen por nombre")
    public ResponseEntity<ImageDTO> findByName(@RequestParam String name) {
        Image image = imageService.findByName(name);
        return ResponseEntity.ok(ImageDTO.fromEntity(image));
    }
} 