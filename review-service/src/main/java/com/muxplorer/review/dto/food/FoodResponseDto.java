package com.muxplorer.review.dto.food;

import com.muxplorer.review.domain.FoodEntity;
import lombok.Getter;
import lombok.Setter;

import static org.springframework.beans.BeanUtils.copyProperties;

@Getter
@Setter
public class FoodResponseDto {
    private Long id;
    private String name;
    private String restaurant;
    private String foodPicture;

    public FoodResponseDto(FoodEntity foodEntity) {
        copyProperties(foodEntity, this);
    }
}
