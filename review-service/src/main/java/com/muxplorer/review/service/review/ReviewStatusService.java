package com.muxplorer.review.service.review;

import com.muxplorer.review.domain.FoodEntity;
import com.muxplorer.review.domain.ReviewEntity;
import com.muxplorer.review.repository.ReviewRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor
public class ReviewStatusService {

    private final ReviewRepository reviewRepository;

    public List<ReviewEntity> findReviewByFood(FoodEntity foodEntity) {
        return reviewRepository.findByFood(foodEntity);
    }

}
