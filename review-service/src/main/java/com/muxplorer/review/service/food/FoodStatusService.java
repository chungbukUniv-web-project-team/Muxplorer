package com.muxplorer.review.service.food;

import com.muxplorer.review.domain.FoodEntity;
import com.muxplorer.review.repository.FoodRepository;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor
public class FoodStatusService {

    private final FoodRepository foodRepository;

    public List<FoodEntity> findAllFood() {return foodRepository.findAll();}

    public FoodEntity findByIdFood(Long foodId) {return foodRepository.findById(foodId).get();}

    public List<FoodEntity> findByRestaurantFood(String restaurant) {return foodRepository.findByRestaurant(restaurant);}
}
