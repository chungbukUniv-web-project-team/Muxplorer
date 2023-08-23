package com.muxplorer.review.dto;

import lombok.Getter;
import org.springframework.http.HttpStatus;

@Getter
public class ApiResult<T> {
    private boolean success;
    private T response;
    private ApiError apiError;

    public ApiResult(boolean success, T response, ApiError apiError) {
        this.success = success;
        this.response = response;
        this.apiError = apiError;
    }

    public static <T> ApiResult<T> OK(T response) { return new ApiResult<>(true, response, null);}

    public static ApiResult<?> ERROR(Throwable throwable, HttpStatus status) {
        return new ApiResult<>(false, null, new ApiError(throwable, status));
    }

    public static ApiResult<?> ERROR(String message, HttpStatus status) {
        return new ApiResult<>(false, null, new ApiError(message, status));
    }
}
