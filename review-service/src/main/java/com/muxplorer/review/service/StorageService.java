package com.muxplorer.review.service;

import com.muxplorer.review.domain.FileData;
import com.muxplorer.review.repository.FileDataRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;

@Service
@RequiredArgsConstructor
public class StorageService {

    private final FileDataRepository fileDataRepository;

    private final String FOLDER_PATH = "C:\\test\\";
    public String uploadImageToFileSystem(MultipartFile file) throws IOException {

        String filePath = FOLDER_PATH + file.getOriginalFilename();

        FileData fileData = fileDataRepository.save(
                    FileData.builder()
                            .name(file.getOriginalFilename())
                            .type(file.getContentType())
                            .filePath(filePath)
                            .build()
                );


        file.transferTo(new File(filePath));

        if (fileData != null) {
            return "file uploaded successfully! filePath : " + filePath;
        }

        return null;
    }

    public byte[] downloadImageFromFileSystem(String fileName) throws IOException {
        FileData fileData = fileDataRepository.findByName(fileName)
                .orElseThrow(RuntimeException::new);

        String filePath = fileData.getFilePath();

        return Files.readAllBytes(new File(filePath).toPath());
    }
}
