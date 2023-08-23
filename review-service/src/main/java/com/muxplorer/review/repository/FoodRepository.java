package com.muxplorer.review.repository;

import com.muxplorer.review.domain.FoodEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface FoodRepository extends JpaRepository<FoodEntity, Long> {
    List<FoodEntity> findByRestaurant(String restaurant);
    boolean existsByNameAndRestaurant(String name, String restaurant);
}
