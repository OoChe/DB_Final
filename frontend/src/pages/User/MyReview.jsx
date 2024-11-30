import React, { useEffect, useState } from "react";
import ReviewForm from "../../components/ReviewForm.jsx";
import ReviewList from "../../components/ReviewList.jsx";
import { useParams, useNavigate } from 'react-router-dom';
import "../../styles/Review.css";

function MyReview() {
  const { id } = useParams();
  const [reviews, setReviews] = useState([]);
  const [avgRating, setAvgRating] = useState([]);
  const userID = localStorage.getItem('userID');

  const fetchMyReviews = async () => {
    try {
      console.error('리뷰 불러오기 함수 호출');
      const response = await fetch('http://localhost:3001/api/myreviews', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userID: userID }), // 아이디를 본문에 담아서 전송
      }); // Node.js API 호출
      const data = await response.json(); // JSON 데이터를 파싱
      setReviews(data.results); // 상태에 저장
      setAvgRating(data.avgRating);
    } catch (error) {
      console.error('API 호출 실패:', error);
    }
  };

  useEffect(() => {
    fetchMyReviews(); // 컴포넌트가 마운트되면 호출
  }, []);


  return (
    <div className="review-page">
      <h3 className="review-title">내가 작성한 후기</h3> 
      <ReviewList reviews={reviews} />
      {/* <ReviewList /> */}
    </div>
  );
}

export default MyReview;
