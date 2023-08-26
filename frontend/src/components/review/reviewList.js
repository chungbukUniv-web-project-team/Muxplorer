import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './reviewList.css';

const ReviewList = () => {
  const { id } = useParams();
  const [reviewList, setReviewList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3;

  useEffect(() => {
    const fetchReviewList = async () => {
      try {
        const response = await axios.get(`http://220.125.53.144:8000/review-service/api/get/review-list/${id}`);
        if (response.data && response.data.response) {
          setReviewList(response.data.response);
        }
      } catch (error) {
        console.error('Error fetching review list:', error);
      }
    };

    fetchReviewList();
  }, [id]);

  const renderStarRating = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(<span key={i} className={i <= rating ? 'star filled' : 'star'}>★</span>);
    }
    return stars;
  };

  const lastItemIndex = currentPage * itemsPerPage;
  const firstItemIndex = lastItemIndex - itemsPerPage;
  const displayedItems = reviewList.slice(firstItemIndex, lastItemIndex);
  const totalPages = Math.ceil(reviewList.length / itemsPerPage);

  const handlePrevPage = () => {
    setCurrentPage(prevPage => Math.max(prevPage - 1, 1));
  };

  const handleNextPage = () => {
    setCurrentPage(prevPage => Math.min(prevPage + 1, totalPages));
  };

  return (
    <div className="review-list-container">
      <ul className="review-list">
        {displayedItems.map((review, index) => (
          <li key={index} className="review-item">
            <div className="review-info">
              <div className="nickname">{review.nickname}</div>
              <div className="rating">{renderStarRating(review.rating)}</div>
            </div>
            <div className="review-content">{review.content}</div>
            <div className="create-date">{review.createDate}</div>
          </li>
        ))}
      </ul>
      <div className="pagination-container">
        <div className="pagination">
          <button onClick={handlePrevPage} disabled={currentPage === 1}>
            Previous
          </button>
          <span> {currentPage} / {totalPages}</span>
          <button onClick={handleNextPage} disabled={currentPage === totalPages}>
            Next
          </button>
        </div>
      </div>
      <div className="comment-field">
        <textarea placeholder="Leave a comment..." />
        <button>Submit</button>
      </div>
    </div>
  );
};

export default ReviewList;
