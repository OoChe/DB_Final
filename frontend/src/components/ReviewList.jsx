import React, {useEffect, useState} from "react";
import { useParams, useNavigate } from 'react-router-dom';

function ReviewList({ reviews }) {

  const { id } = useParams();

  return (
    <div className="review-list">
      {reviews.map((review) => (
        <div key={review.ReviewID} className="review-item">
          <div className="rating">
            {[1, 2, 3, 4, 5].map((star) => (
              <span
                key={star}
                className={star <= review.Rating ? "star filled" : "star"}
              >
                ★
              </span>
            ))}
          </div>
          <p>아이디: {review.UserID ? review.UserID.substring(0, 3) + '****' : "아이디 없음"}</p>
          <p>{review.Content}</p>
        </div>
      ))}
    </div>
  );
}

export default ReviewList;
