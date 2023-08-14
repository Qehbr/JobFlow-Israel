import React from 'react';
import '../styles/Popup.css';
import catDiver from '../icons/cat-diver.png';

function Popup({ onClose }) {
  return (
    <div className="popup-overlay">
      <div className="popup-container">
        <p className="popup-title">
          Oh no!
        </p>
        <img className="popup-image" src={catDiver} alt="Cat Diver" />
        <p className="popup-message">
          It seems like there are too many divers here and my free quota has been exceeded
        </p>
        <p className="popup-message">
          Try diving again later!
        </p>

        <button className="popup-close-button" onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  );
}

export default Popup;
