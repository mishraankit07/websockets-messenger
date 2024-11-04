package com.example.demo.controller;

import com.amazonaws.services.s3.model.ObjectMetadata;
import com.example.demo.model.S3UploadResponse;
import com.example.demo.service.S3Service;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import java.io.IOException;
import java.io.InputStream;

@RestController
@RequestMapping("/api/s3")
public class S3Controller {

    private final S3Service s3Service;
    private final ObjectMapper objectMapper;

    public S3Controller(S3Service s3Service, ObjectMapper objectMapper){
        this.s3Service = s3Service;
        this.objectMapper = objectMapper;
    }

    @PostMapping("/upload")
    public ResponseEntity<String> uploadFile(@RequestParam("file") MultipartFile file) throws JsonProcessingException {
        String keyName = file.getOriginalFilename();
        ObjectMetadata metadata = new ObjectMetadata();
        metadata.setContentLength(file.getSize());

        try (InputStream inputStream = file.getInputStream()) {
            String fileUrl = s3Service.uploadFile(keyName, inputStream, metadata);
            return ResponseEntity.status(HttpStatus.CREATED)
                    .body(objectMapper.writeValueAsString(new S3UploadResponse("file:" + keyName + " uploaded successfully to S3", keyName, fileUrl)));

        } catch (IOException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(objectMapper.writeValueAsString(new S3UploadResponse("Error uploading file to S3: " + e.getMessage(), "", "")));
        }
    }
}
