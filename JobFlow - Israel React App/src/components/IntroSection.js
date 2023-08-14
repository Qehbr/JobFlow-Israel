import React from 'react';
import '../styles/IntroSection.css'; // Import the CSS for this component

function IntroSection({ onStartClick }) {
  return (
    <div className="intro-section">
      <div className="intro-content">
        <h1 className="intro-title">Welcome to JobFlow - Israel</h1>
        <p className="intro-description">
          Your source for job statistics in Israel
        </p>
        <button className="get-started-button" onClick={onStartClick}>
          Get Started
        </button>
      </div>
    </div>
  );
}

export default IntroSection;
