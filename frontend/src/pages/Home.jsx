import React from 'react';
import mainImage from '../../src/assets/image/mainImage.svg';

export default function Home() {
  return (
    <div>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-start',
          alignItems: 'center',
          alignSelf: 'stretch',
          gap: 32,
          paddingLeft: 24,
          paddingRight: 24,
          paddingTop: 160,
          paddingBottom: 160,
          background: '#f5f5f5',
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-start',
            alignItems: 'center',
            flexGrow: 0,
            flexShrink: 0,
            position: 'relative',
            gap: 8,
          }}
        >
          <p
            style={{
              alignSelf: 'stretch',
              fontSize: 72,
              fontWeight: 700,
              textAlign: 'center',
              color: '#1e1e1e',
            }}
          >
            Travel Guide
          </p>
          <p
            style={{
              alignSelf: 'stretch',
              fontSize: 32,
              textAlign: 'center',
              color: '#757575',
            }}
          >
            <span
              style={{
                alignSelf: 'stretch',
                fontSize: 32,
                textAlign: 'center',
                color: '#757575',
              }}
            >
              세상은 넓고, 당신의 여행은 무한합니다.
            </span>
            <br />
            <span
              style={{
                alignSelf: 'stretch',
                fontSize: 32,
                textAlign: 'center',
                color: '#757575',
              }}
            >
              Travel Guide에서 다양한 여행지의 행사와 숙소를 찾아보세요.
            </span>
          </p>
        </div>
      </div>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-start',
          alignItems: 'flex-start',
          alignSelf: 'stretch',
          height: 524,
          position: 'relative',
          gap: 10,
          background: '#e3e3e3',
        }}
      >
        <img
          src={mainImage}
          alt='이미지'
          style={{
            alignSelf: 'stretch',
            flexGrow: 0,
            flexShrink: 0,
            height: 521,
            objectFit: 'cover',
          }}
        />
      </div>
    </div>
  );
}
