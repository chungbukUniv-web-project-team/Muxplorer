import React from 'react';
import ReviewList from '../../components/review/reviewList';
import FoodDetail from '../../components/review/foodDetail';
import ReviewRegister from '../../components/review/ReviewRegister';

function ReviewPage() {
  return (
    <div>
        <FoodDetail />
        <ReviewList />
        <ReviewRegister />
    </div>
  );
}

export default ReviewPage;
