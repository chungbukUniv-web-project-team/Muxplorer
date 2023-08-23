package com.muxplorer.review.service.review;

import com.muxplorer.review.domain.FoodEntity;
import com.muxplorer.review.domain.ReviewEntity;
import com.muxplorer.review.dto.review.ReviewRequest;
import com.muxplorer.review.repository.ReviewRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.time.LocalDateTime;
import java.util.Date;

@Service
@AllArgsConstructor
public class ReviewRegisterService {

    private final ReviewRepository reviewRepository;
    private final String FOLDER_PATH = "C:\\test\\";

    public ReviewEntity addReview(FoodEntity foodEntity, ReviewRequest reviewRequest, MultipartFile image) {

        Date date = new Date();
        String filePath = "";

        if(image.isEmpty()) {
            filePath = "null";
        } else {
            filePath = FOLDER_PATH + File.separator+ date.getTime() + "_" + image.getOriginalFilename();
        }

        /* userId로 닉네임 불러오기 API
            private Long userId = reviewRequest.getUserId();
            private String nickname = ~~~~~

            밑에 코드도 수정 (nickname, userId)
        */

        ReviewEntity reviewEntity = ReviewEntity.builder()
                .food(foodEntity)
                .userId(reviewRequest.getUserId())
                .content(reviewRequest.getContent())
                .rating(reviewRequest.getRating())
                .reviewPicture(filePath)
                .createDate(LocalDateTime.now())
                .modifiedDate(LocalDateTime.now())
                .build();

        try {
            if(!image.isEmpty()) {
                image.transferTo(new File(filePath));
            }
        } catch (IOException e) {
            e.printStackTrace();
        }

        return reviewRepository.save(reviewEntity);
    }

}
