import React from "react";

function RegionSection({ setRegion }) {
  const regions = [
    "서울특별시",
    "부산광역시",
    "제주도",
    "강원도",
    "전라도",
    "경상도",
    "충청도",
  ];

  return (
    <div className="region-section">
      <h3>지역별 숙소 찾기</h3>
      <div className="region-buttons">
        {regions.map((region, index) => (
          <button key={index} onClick={() => setRegion(region)}>
            {region}
          </button>
        ))}
      </div>
    </div>
  );
}

export default RegionSection;
