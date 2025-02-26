package com.imamultidev.galeria.service;

import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Map;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class CloudinaryService {

    private final Cloudinary cloudinary;

    public Map<String, String> upload(MultipartFile file) throws IOException {
        String uniqueFileName = generateUniqueFileName(file.getOriginalFilename());
        
        Map<?, ?> uploadResult = cloudinary.uploader()
                .upload(file.getBytes(),
                        ObjectUtils.asMap(
                                "public_id", "gallery/" + uniqueFileName,
                                "overwrite", true,
                                "resource_type", "auto"
                        ));

        return Map.of(
                "url", uploadResult.get("secure_url").toString(),
                "publicId", uploadResult.get("public_id").toString()
        );
    }

    public void delete(String publicId) throws IOException {
        cloudinary.uploader().destroy(publicId,
                ObjectUtils.asMap("resource_type", "image"));
    }

    private String generateUniqueFileName(String originalFileName) {
        String fileExtension = originalFileName.substring(originalFileName.lastIndexOf("."));
        return UUID.randomUUID().toString() + fileExtension;
    }
} 