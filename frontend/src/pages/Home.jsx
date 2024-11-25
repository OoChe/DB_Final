import React from 'react';
import mainImage from '../../src/assets/image/mainImage.svg';
import '../styles/Home.css';

export default function Home() {
  return (
    <div>
      <div className='home-container'>
        <div className='home-header'>
          <p className='home-title'>Travel Guide</p>
          <p className='home-subtitle'>
            <span>세상은 넓고, 당신의 여행은 무한합니다.</span>
            <br />
            <span>
              Travel Guide에서 다양한 여행지의 행사와 숙소를 찾아보세요.
            </span>
          </p>
        </div>
      </div>
      <div className='home-image-container'>
        <img src={mainImage} alt='이미지' className='home-main-image' />
      </div>
    </div>
  );
}
