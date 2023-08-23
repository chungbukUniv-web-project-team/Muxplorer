package com.muxplorer.review.exception;

public class NoExistReviewIdException extends RuntimeException{

    private static final String MESSAGE = "해당 리뷰는 존재하지 않습니다.";
    public NoExistReviewIdException() { super((MESSAGE)); }
}
