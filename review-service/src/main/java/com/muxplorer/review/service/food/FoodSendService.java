package com.muxplorer.review.service.food;

import com.muxplorer.review.domain.FoodEntity;
import com.muxplorer.review.dto.food.FoodRequest;
import com.muxplorer.review.repository.FoodRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@AllArgsConstructor
public class FoodSendService {

    private final FoodRepository foodRepository;

    public List<FoodEntity> addFood(List<FoodRequest> foodRequestList) {
        List<FoodEntity> responseList = new ArrayList<>();

        for(FoodRequest foodRequest : foodRequestList) {
            if(foodRepository.existsByNameAndRestaurant(foodRequest.getName(), foodRequest.getRestaurant())) {
                continue;
            }

            FoodEntity foodEntity = FoodEntity.builder()
                    .name(foodRequest.getName())
                    .restaurant(foodRequest.getRestaurant())
                    .foodPicture(foodRequest.getFoodPicture())
                    .build();

            foodRepository.save(foodEntity);
            responseList.add(foodEntity);
        }
        return responseList;
    }


}
