package com.blog.blog.controller;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.Resource;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import jakarta.annotation.PostConstruct;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.List;
import org.springframework.core.io.UrlResource;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
;

@RestController
@RequestMapping("/images")
public class ImageController {

    @Value("${file.upload-dir}")
    private String uploadDir;

    private Path imageLocation;

    @PostConstruct
    private void init() {
        if (uploadDir == null || uploadDir.isEmpty()) {
            throw new IllegalStateException("Upload directory not configured");
        }
        imageLocation = Paths.get(uploadDir);
    }

    @GetMapping("/{filename:.+}")
    public ResponseEntity<Resource> getImage(@PathVariable String filename) {
        try {
            Path filePath = imageLocation.resolve(filename);
            Resource resource = new UrlResource(filePath.toUri());
            
            if (resource.exists() || resource.isReadable()) {
                return ResponseEntity.ok()
                        .contentType(MediaType.IMAGE_JPEG) // Change this if you are using different image types
                        .body(resource);
            } else {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @GetMapping("/list")
    public List<String> listImages() {
        List<String> imageNames = new ArrayList<>();
        try {
            Files.walk(imageLocation)
                .filter(Files::isRegularFile)
                .forEach(file -> imageNames.add(file.getFileName().toString()));
        } catch (IOException e) {
            e.printStackTrace();
        }
        return imageNames;
    }
}
