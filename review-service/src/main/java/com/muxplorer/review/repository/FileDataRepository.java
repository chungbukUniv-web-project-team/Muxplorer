package com.muxplorer.review.repository;

import com.muxplorer.review.domain.FileData;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface FileDataRepository extends JpaRepository<FileData, Long> {

    Optional<FileData> findByName(String fileName);
}
