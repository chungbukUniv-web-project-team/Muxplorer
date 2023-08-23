package com.muxplorer.review.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.List;

@Entity
@Table(name = "food")
@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class FoodEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private String restaurant;
    private String foodPicture;

    @JsonIgnore
    @OneToMany(mappedBy = "food", cascade = CascadeType.REMOVE)
    private List<ReviewEntity> reviewEntityList;
}
