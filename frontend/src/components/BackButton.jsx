import React from "react";
import { useNavigate } from "react-router-dom";
import "./backButton.css"; // Optional: custom styles

const BackButton = ({ label = "← Back" }) => {
  const navigate = useNavigate();

  return (
    <button className="back-button11" onClick={() => navigate(-1)}>
      {label}
    </button>
  );
};

export default BackButton;