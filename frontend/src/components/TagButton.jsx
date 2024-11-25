import React from 'react';
import "../styles/Button.css";

const TagButton = ({ text, onClick, isSelected = false }) => {
  return (
    <button 
    className={`btn tag-button-${isSelected ? 'highlight' : 'primary'}`} 
    onClick={onClick}
    >
      #{text}
    </button>
  );
};

export default TagButton;
