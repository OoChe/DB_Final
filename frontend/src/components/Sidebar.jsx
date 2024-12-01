import React, { useState } from 'react';
import '../styles/Sidebar.css';
import TagButton from './TagButton.jsx';

function FilterSidebar({
  selectedRegion,
  setSelectedRegion,
  selectedMonth,
  setSelectedMonth,
}) {
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

  const months = [
    '전체',
    '1월',
    '2월',
    '3월',
    '4월',
    '5월',
    '6월',
    '7월',
    '8월',
    '9월',
    '10월',
    '11월',
    '12월',
  ];

  //   const [selectedRegion, setSelectedRegion] = useState("전체");
  //   const [selectedMonth, setSelectedMonth] = useState("전체");

  const handleTagClick = (type, value) => {
    console.log('Tag clicked: ', type, value);
    if (type === 'region') {
      setSelectedRegion(value === selectedRegion ? null : value); // 같은 탭 클릭 시 선택 해제
    } else if (type === 'month') {
      setSelectedMonth(value === selectedMonth ? null : value); // 같은 탭 클릭 시 선택 해제
    }
  };

  return (
    <div className='filter-sidebar'>
      <h3 className='filter-title'>지역 행사 찾기</h3>
      <div className='filter-tags'>
        {regions.map((region, index) => (
          <TagButton
            key={index}
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
      <h3>월별 행사 찾기</h3>
      <div className='filter-tags'>
        {months.map((month, index) => (
          <TagButton
            key={index}
            text={month}
            onClick={() => handleTagClick('month', month)}
            isSelected={selectedMonth === month}
          />
        ))}
        {/* {months.map((month, index) => (
          <span key={index} className="tag">
            #{month}
          </span>
        ))} */}
      </div>
    </div>
  );
}

export default FilterSidebar;
