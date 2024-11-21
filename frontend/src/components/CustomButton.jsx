import React from 'react';

// 색상, 글씨 모두 안보이므로 수정 필요
export default function CustomButton(props) {
  const { text, textColor, innerColor, borderColor } = props;
  const button = {
    height: 30,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexGrow: 1,
    position: 'relative',
    overflow: 'hidden',
    borderRadius: 16,
    background: innerColor,
    borderWidth: 2,
    borderColor: borderColor,
    borderStyle: 'solid',
    paddingLeft: 15,
    paddingRight: 15,
  }
  return (
    <button style={button}>
      <p
        style={{
          flexGrow: 0,
          flexShrink: 0,
          fontSize: 16,
          textAlign: 'center',
          color: textColor,
        }}
      >
        {text}
      </p>
    </button>
  );
}

