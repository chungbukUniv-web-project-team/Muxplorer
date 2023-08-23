package com.muxplorer.review.controller;

import com.muxplorer.review.domain.FoodEntity;
import com.muxplorer.review.dto.ApiResult;
import com.muxplorer.review.dto.review.ReviewResponseDto;
import com.muxplorer.review.dto.review.ReviewRequest;
import com.muxplorer.review.service.food.FoodStatusService;
import com.muxplorer.review.service.review.ReviewDeleteService;
import com.muxplorer.review.service.review.ReviewRegisterService;
import com.muxplorer.review.service.review.ReviewStatusService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Controller;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

import static java.util.stream.Collectors.toList;

@Controller
@ResponseBody
@RequestMapping("/api")
@RequiredArgsConstructor
public class ReviewController {

    private final ReviewRegisterService reviewRegisterService;
    private final FoodStatusService foodStatusService;
    private final ReviewStatusService reviewStatusService;
    private final ReviewDeleteService reviewDeleteService;

    // 리뷰 등록
    @PostMapping("/send/review")
    public ApiResult<ReviewResponseDto> registerReview(@RequestPart(value = "image", required = false) MultipartFile image,
                                                       @Validated @RequestPart("info") ReviewRequest reviewRequest) {
        FoodEntity foodEntity = foodStatusService.findByIdFood(reviewRequest.getFoodId());
        return ApiResult.OK(new ReviewResponseDto(reviewRegisterService.addReview(foodEntity, reviewRequest, image)));
    }

    // 특정 음식에 해당하는 리뷰 리스트
    @GetMapping("/get/review-list/{id}")
    public ApiResult<List<ReviewResponseDto>> reviewList(@PathVariable("id") Long foodId) {
        FoodEntity foodEntity = foodStatusService.findByIdFood(foodId);
        return ApiResult.OK(reviewStatusService.findReviewByFood(foodEntity).stream().map(reviewEntity -> new ReviewResponseDto(reviewEntity)).collect(toList()));
    }

    // 리뷰 삭제
    @DeleteMapping("/delete/review/{id}")
    public ApiResult<?> deleteReviewById(@PathVariable("id") Long reviewId) {
        try {
            reviewDeleteService.deleteReview(reviewId);
            return ApiResult.OK(true);
        } catch (Exception e) {
            return ApiResult.ERROR(e, HttpStatus.BAD_REQUEST);
        }
    }
}
