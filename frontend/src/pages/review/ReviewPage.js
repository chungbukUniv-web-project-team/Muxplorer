import React from 'react';
import ReviewList from '../../components/review/reviewList';
import FoodDetail from '../../components/review/foodDetail';

function ReviewPage() {
  return (
    <div>
        <FoodDetail />
        <ReviewList />
    </div>
  );
}

export default ReviewPage;
