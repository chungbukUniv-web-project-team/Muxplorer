package com.muxplorer.review.domain;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.Date;

@Entity
@Table(name = "review")
@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ReviewEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    private FoodEntity food;

    private Long userId;

    @Column(columnDefinition = "TEXT")
    private String content;
    private Float rating;
    private String reviewPicture;
    private LocalDateTime createDate;
    private LocalDateTime modifiedDate;

}
