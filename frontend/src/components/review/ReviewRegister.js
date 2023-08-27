import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from "axios";
import './ReviewRegister.css'; 
import Token from "../../components/Token";

const ReviewRegister = () => {
  const [Content, setContent] = useState('');
  const [Rating, setRating] = useState(0);
  const { id } = useParams();

  const handleReviewSubmit = () => {
    if (Content.trim() === '') {
      alert("리뷰를 입력해주세요");
      return;
    }

    if (Rating === 0) {
      alert("별점을 입력해주세요");
      return;
    }

    let data = {
      foodId: id,
      userId: localStorage.getItem("id"),
      nickname: localStorage.getItem("nickname"),
      content: Content,
      rating: Rating
    };
    
    axios
    .post("http://220.125.53.144:8000/review-service/api/send/review", data, 
    Token(localStorage.getItem("accessToken")))
    .then((response) => {
      console.log(response);
      alert("리뷰 등록에 성공했습니다");
      window.location.reload();
    })
    .catch((error) => {
      console.error(error);
      alert("리뷰 등록에 실패했습니다. 로그인을 해주세요");
    });
  };

  return (
    <div className="review-register-container">
      {/* Existing JSX for Review Register component */}
      <div className="comment-input-container">
        <textarea
          className="comment-input-content"
          placeholder="리뷰를 입력해주세요"
          value={Content}
          onChange={(e) => setContent(e.target.value)}
        />
        <span>별점 </span>
        <input
          className="comment-input-rating"
          type="number"
          min="0"
          max="5"
          step="1"
          placeholder="별점 (0-5)"
          value={Rating}
          onChange={(e) => setRating(parseFloat(e.target.value))}
        />
        <button className="comment-input-submit" onClick={handleReviewSubmit}>
          리뷰 등록
        </button>
      </div>
    </div>
  );
};

export default ReviewRegister;
