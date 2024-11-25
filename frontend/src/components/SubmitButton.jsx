import React from 'react';
import "../styles/Button.css";

const SubmitButton = ({ text, onSubmit, size = 'normal'}) => {
  let buttonClass = 'submit-button';

  if (size === 'big') {
    buttonClass += '-big';
  }

  return (
    <button 
    type = "submit"
    className = {`btn ${buttonClass}`}
    onClick={onSubmit}>
    {text}
    </button>
  );
};

export default SubmitButton;
