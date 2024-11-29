import React from 'react';
import '../styles/Hotel.css';
import TagButton from './TagButton';

function RegionSection({ selectedRegion, setSelectedRegion }) {
  const regions = [
    '전체',
    '서울',
    '부산',
    '대구',
    '인천',
    '광주',
    '대전',
    '울산',
    '세종',
    '경기',
    '강원',
    '충북',
    '충남',
    '전북',
    '전남',
    '경북',
    '경남',
    '제주',
  ];
  const handleTagClick = (type, value) => {
    console.log('Tag clicked: ', type, value);
    if (type === 'region')
      setSelectedRegion(value === selectedRegion ? null : value); // 같은 탭 클릭 시 선택 해제
  };

  return (
    <div className='region-section'>
      <h3>지역 행사 찾기</h3>
      <div className='region-buttons'>
        {regions.map((region) => (
          <TagButton
            text={region}
            onClick={() => handleTagClick('region', region)}
            isSelected={selectedRegion === region}
          />
        ))}
        {/* {regions.map((region, index) => (
          <span key={index} className="tag">
            #{region}
          </span>
        ))} */}
      </div>
    </div>
  );
}

export default RegionSection;
