import React, { useState } from 'react';
import './ReviewRegister.css'; 

const ReviewRegister = () => {

  const [commentContent, setCommentContent] = useState('');
  const [commentRating, setCommentRating] = useState(0);

  const handleCommentSubmit = () => {
    console.log('Comment content:', commentContent);
    console.log('Comment rating:', commentRating);

    setCommentContent('');
    setCommentRating(0);
  };

  return (
    <div className="review-register-container">
      {/* Existing JSX for Review Register component */}

      {/* Comment input */}
      <div className="comment-input-container">
        <textarea
          className="comment-input-content"
          placeholder="리뷰를 입력해주세요"
          value={commentContent}
          onChange={(e) => setCommentContent(e.target.value)}
        />
        <input
          className="comment-input-rating"
          type="number"
          min="0"
          max="5"
          step="1"
          placeholder="별점 (0-5)"
          value={commentRating}
          onChange={(e) => setCommentRating(parseFloat(e.target.value))}
        />
        <button className="comment-input-submit" onClick={handleCommentSubmit}>
          리뷰 등록
        </button>
      </div>
    </div>
  );
};

export default ReviewRegister;
