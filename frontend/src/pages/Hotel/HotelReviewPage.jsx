import React, { useEffect, useState } from 'react';
import HotelReviewForm from '../../components/ReviewForm.jsx';
import ReviewList from '../../components/ReviewList.jsx';
import { useParams, useNavigate } from 'react-router-dom';
import '../../styles/Review.css';

function HotelReviewPage() {
  const { id } = useParams();
  const [reviews, setReviews] = useState([]);
  const [avgRating, setAvgRating] = useState([]);

  const fetchReviews = async () => {
    try {
      console.error('리뷰 불러오기 함수 호출');
      const response = await fetch(
        `http://localhost:3001/api/hotel/reviews/${id}`
      ); // Node.js API 호출
      const data = await response.json(); // JSON 데이터를 파싱
      setReviews(data.results); // 상태에 저장
      setAvgRating(data.avgRating);
    } catch (error) {
      console.error('API 호출 실패:', error);
    }
  };

  useEffect(() => {
    fetchReviews(); // 컴포넌트가 마운트되면 호출
  }, []);

  return (
    <div className='review-page'>
      <h1 className='review-title'>숙소 후기</h1>
      {/* <ReviewForm onAddReview={addReview} /> */}
      <HotelReviewForm />
      <h3>전체 후기</h3>
      <p>평균 별점: {parseFloat(avgRating).toFixed(1)} / 5</p>
      <ReviewList reviews={reviews} />
    </div>
  );
}

export default HotelReviewPage;
