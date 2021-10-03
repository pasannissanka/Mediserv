package com.example.mediservapi.controller;

import com.example.mediservapi.dto.response.FileResponse;
import com.example.mediservapi.dto.response.LoadFile;
import com.example.mediservapi.service.FileService;
import com.google.cloud.spring.vision.CloudVisionTemplate;
import com.google.cloud.vision.v1.AnnotateImageResponse;
import com.google.cloud.vision.v1.Feature;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/api/file")
public class FileController {

    @Autowired
    private FileService fileService;

    @Autowired
    private CloudVisionTemplate cloudVisionTemplate;


    @PostMapping("/upload")
    public ResponseEntity<FileResponse> upload(@RequestParam("file") MultipartFile file, Authentication authentication) throws IOException {
        UserDetails userDetails = (UserDetails) authentication.getPrincipal();
        String fileId = fileService.addFile(file, userDetails.getUsername());
        FileResponse response = new FileResponse()
                .setFileName(file.getOriginalFilename())
                .setId(fileId)
                .setMimeType(file.getContentType());
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @GetMapping("/download/{id}")
    public ResponseEntity<ByteArrayResource> download(@PathVariable String id) throws IOException {
        LoadFile loadFile = fileService.downloadFile(id);

        return ResponseEntity.ok()
                .contentType(MediaType.parseMediaType(loadFile.getFileType() ))
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + loadFile.getFilename() + "\"")
                .body(new ByteArrayResource(loadFile.getFile()));
    }

    @GetMapping(value = "/gcp/label_detection/{id}")
    public ResponseEntity labelDetection(@PathVariable String id) throws IOException {
        LoadFile loadFile = fileService.downloadFile(id);
        ByteArrayResource imageResource = new ByteArrayResource(loadFile.getFile());
        AnnotateImageResponse response = this.cloudVisionTemplate.analyzeImage(imageResource, Feature.Type.LABEL_DETECTION);

        return ResponseEntity.ok(response.getLabelAnnotationsList());
    }
}
