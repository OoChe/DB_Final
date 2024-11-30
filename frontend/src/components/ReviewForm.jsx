import React, { useState } from "react";
import { useParams, useNavigate } from 'react-router-dom';

//function ReviewForm({ onAddReview }) {
function ReviewForm() {
  const [rating, setRating] = useState(0);
  const [content, setContent] = useState("");
  const { id } = useParams();
  const userID = localStorage.getItem('userID');

// 폼 제출 처리
const handleSubmit = async (e) => {
    console.log(userID);
    e.preventDefault();
    if (rating > 0 && content.trim() !== "") {
      // 서버에 후기 데이터를 전송
      const reviewData = { userID, id, rating, content };
      try {
        const response = await fetch("http://localhost:3001/api/review", {
          method: "POST", // HTTP POST 요청
          headers: {
            "Content-Type": "application/json", // JSON 요청
          },
          body: JSON.stringify(reviewData), // 데이터 JSON 직렬화
        });

        const result = await response.json();

        if (response.ok) {
          alert("후기가 성공적으로 등록되었습니다!");
          //onAddReview({ rating, content, date: new Date().toLocaleString() }); // 부모 컴포넌트에 전달
          setRating(0); // 상태 초기화
          setContent("");
        } else {
          alert(result.message || "후기 등록에 실패했습니다.");
        }
      } catch (error) {
        console.error("Error submitting review:", error);
        alert("서버와의 통신에 문제가 발생했습니다.");
      }
    } else {
      alert("별점과 후기를 모두 작성해주세요!");
    }
  };

// const handleSubmit = (e) => {
//     e.preventDefault();
//     if (rating > 0 && content.trim() !== "") {
//       const reviewData = { rating, content};
//       onAddReview({ rating, content });
//       setRating(0);
//       setContent("");
//     } else {
//       alert("별점과 후기를 모두 작성해주세요!");
//     }
//   };

  return (
    <form className="review-form" onSubmit={handleSubmit}>
      <div className="rating">
        {[1, 2, 3, 4, 5].map((star) => (
          <span
            key={star}
            className={star <= rating ? "star filled" : "star"}
            onClick={() => setRating(star)}
          >
            ★
          </span>
        ))}
        <span className="rating-number">{rating}/5</span>
      </div>
      {/* <input
        type="text"
        placeholder="후기를 작성하세요"
        value={text}
        onChange={(e) => setText(e.target.value)}
      /> */}
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="후기를 작성하세요"
        rows="4"
      ></textarea>
      <button type="submit">등록</button>
    </form>
  );
}

export default ReviewForm;
