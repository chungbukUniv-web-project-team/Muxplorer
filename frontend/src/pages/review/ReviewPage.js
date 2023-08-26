import React from 'react';
import ReviewList from '../../components/review/ReviewList';
import FoodDetail from '../../components/review/FoodDetail';
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
