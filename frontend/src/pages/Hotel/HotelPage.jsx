/* [숙소 목록 보여주는 페이지] */
import React, { useState } from 'react';
import HotelList from '../../components/HotelList';
import RegionSection from '../../components/RegionSection';
import '../../styles/Hotel.css';

export default function HotelPage() {
  const [selectedRegion, setSelectedRegion] = useState('전체');

  return (
    <div className='hotel-page'>
      <p className='HotelPage-title'>숙소</p>
      <div className='main-content'>
        <HotelList selectedRegion={selectedRegion} />
        <RegionSection
          selectedRegion={selectedRegion}
          setSelectedRegion={setSelectedRegion}
        />
      </div>
    </div>
  );
}
