import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './ReviewList.css';
import Token from "../../components/Token";

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
          // Sort reviews in descending order based on createDate
          const sortedReviews = response.data.response.sort((a, b) =>
            new Date(b.createDate) - new Date(a.createDate)
          );
          setReviewList(sortedReviews);
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

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit' };
    const formattedDate = new Date(dateString).toLocaleDateString('en-US', options);
    return formattedDate;
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

  const handleDeleteReview = (event) => {
      const reviewId = event.id;
      const userId = event.userId;

      if(userId == localStorage.getItem("id")) {
        axios.delete(`http://220.125.53.144:8000/review-service/api/delete/review/${reviewId}`, Token(localStorage.getItem("accessToken")))
            .then(response => {
                console.log(response)
                alert("리뷰 삭제에 성공했습니다");
                window.location.reload();
            })
            .catch(error => {
                console.error(error);
                alert("리뷰 삭제에 실패했습니다")
            });
      } else {
        console.log(userId);
        console.log(localStorage.getItem("id"));
        alert("리뷰 작성자만 삭제 가능합니다")
      }
  };


  return (
    <div className="review-list-container">
      <ul className="review-list">
          {displayedItems.map((review, index) => (
            <li key={index} className="review-item">
              <div className="review-info">
                <div className="nickname">닉네임: {review.nickname}</div>
                <div className="rating">{renderStarRating(review.rating)}</div>
              </div>
              <div className="review-content">{review.content}</div>
              <div className="create-date">{formatDate(review.createDate)}</div>
                <button className="delete-button" onClick={() => handleDeleteReview(review)}>
                  삭제
                </button>
            </li>
        ))}
      </ul>
      {reviewList.length > 0 && (  // Conditionally render pagination
      <div className="pagination">
        <button 
          className="pagination-button"
          onClick={handlePrevPage} 
          disabled={currentPage === 1}>
          <span className="arrow-button">‹</span>
        </button>
        <span className="pagination-whole">
          <span className="pagination-current">{currentPage.toString().padStart(2, '0')}</span>
          <span className="pagination-separator"> / </span>
          <span className="pagination-total">{totalPages.toString().padStart(2, '0')}</span>
        </span>
        <button 
          className="pagination-button"
          onClick={handleNextPage} 
          disabled={currentPage === totalPages}>
          <span className="arrow-button">›</span>
        </button>
      </div>
    )}
  </div>
  );
};

export default ReviewList;
