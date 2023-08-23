package com.muxplorer.review.service.review;

import com.muxplorer.review.exception.NoExistReviewIdException;
import com.muxplorer.review.repository.ReviewRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@AllArgsConstructor
public class ReviewDeleteService {

    private final ReviewRepository reviewRepository;

    @Transactional
    public void deleteReview(Long reviewId) throws Exception {

        if(!reviewRepository.existsById(reviewId)) {
            throw new NoExistReviewIdException();
        }

        reviewRepository.deleteById(reviewId);
    }
}
