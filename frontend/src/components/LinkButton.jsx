import React from 'react';
import { Link } from 'react-router-dom';
import "../styles/Button.css";

const LinkButton = ({ text, to }) => {
  return (
    <Link to={to} className="btn link-button">
      {text}
    </Link>
  );
};

export default LinkButton;
