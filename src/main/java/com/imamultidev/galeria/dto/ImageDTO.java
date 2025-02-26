package com.imamultidev.galeria.dto;

import com.imamultidev.galeria.model.Image;
import lombok.Data;

import java.time.LocalDateTime;

@Data
public class ImageDTO {
    private Long id;
    private String name;
    private String url;
    private String description;
    private Long fileSize;
    private String contentType;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    public static ImageDTO fromEntity(Image image) {
        ImageDTO dto = new ImageDTO();
        dto.setId(image.getId());
        dto.setName(image.getName());
        dto.setUrl(image.getUrl());
        dto.setDescription(image.getDescription());
        dto.setFileSize(image.getFileSize());
        dto.setContentType(image.getContentType());
        dto.setCreatedAt(image.getCreatedAt());
        dto.setUpdatedAt(image.getUpdatedAt());
        return dto;
    }
} 