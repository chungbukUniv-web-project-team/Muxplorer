package com.muxplorer.review.dto.review;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Getter;

import java.time.LocalDateTime;
import java.util.Date;

@Getter
public class ReviewRequest {

    @NotNull
    private Long userId;

    @NotNull
    private Long foodId;

    @NotBlank
    @Size(min = 1, max = 300, message = "리뷰의 길이는 1글자 ~ 300글자")
    private String content;

    @NotNull
    private Float rating;

}
