package com.muxplorer.review.controller;

import com.muxplorer.review.dto.ApiResult;
import com.muxplorer.review.dto.food.FoodResponseDto;
import com.muxplorer.review.dto.food.FoodRequest;
import com.muxplorer.review.service.food.FoodSendService;
import com.muxplorer.review.service.food.FoodStatusService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;

import static java.util.stream.Collectors.toList;

@Controller
@ResponseBody
@RequestMapping("/api")
@RequiredArgsConstructor
public class FoodController {

    private final FoodSendService foodSendService;
    private final FoodStatusService foodStatusService;

    // 음식 리스트 받아오기(크롤링)
    @PostMapping("/send/foods")
    public ApiResult<List<FoodResponseDto>> foodRegister(@RequestBody List<FoodRequest> foodRequest) {
        return ApiResult.OK(foodSendService.addFood(foodRequest).stream().map(foodEntity -> new FoodResponseDto(foodEntity)).collect(toList()));
    }

    // 음식 리스트
    @GetMapping("/get/food-list")
    public ApiResult<List<FoodResponseDto>> foodListAll() {
        return ApiResult.OK(foodStatusService.findAllFood().stream().map(foodEntity -> new FoodResponseDto(foodEntity)).collect((toList())));
    }

    // 음식점별 음식 리스트
    @GetMapping("/get/food-list/{restaurant}")
    public ApiResult<List<FoodResponseDto>> foodListRestaurant(@PathVariable("restaurant") String restaurant) {
        String restaurantName = null;
        if(restaurant.equals("eunhasu")) {
            restaurantName = "은하수식당";
        } else if(restaurant.equals("byeolbich")) {
            restaurantName = "별빛식당";
        } else if(restaurant.equals("hanbich")) {
            restaurantName = "한빛식당";
        }

        return ApiResult.OK(foodStatusService.findByRestaurantFood(restaurantName).stream().map(foodEntity -> new FoodResponseDto(foodEntity)).collect(toList()));
    }
}
