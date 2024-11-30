import React from 'react';
import '../styles/StarFilled.css';

function renderStars(rating) {
  // 전달받은 rating이 null이거나 유효하지 않은 값일 경우 0으로 처리
  const roundedRating = rating ? parseFloat(parseFloat(rating).toFixed(1)) : 0;
  return [...Array(5)].map((_, index) => {
    const diff = roundedRating - index;

    let starClass = '';
    if (diff >= 1) {
      starClass = 'filled'; // 완전히 채운 별
    } else if (diff > 0) {
      starClass = 'half-filled'; // 일부만 채운 별
    }

    return (
      <span key={index} className={`star ${starClass}`}>
        ★
      </span>
    );
  });
}

export default renderStars;
