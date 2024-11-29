import '../styles/StarFilled.css';

function renderStars(rating) {
  const roundedRating = parseFloat(rating.toFixed(1)); // 소수점 아래 한 자리까지 반올림
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
