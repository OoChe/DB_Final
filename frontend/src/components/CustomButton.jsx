import React from 'react';
import '../styles/Header.css';

export default function CustomButton({ text, textColor, innerColor, borderColor , onClick}) {
  const customStyles = {
    backgroundColor: innerColor,
    borderColor: borderColor,
    color: textColor,
  };

  return (
    <button className="custom-button" style={customStyles} onClick={onClick}>
      {text}
    </button>
  );
}
