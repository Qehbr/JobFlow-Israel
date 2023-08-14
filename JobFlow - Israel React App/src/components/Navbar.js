// Navbar.js
import React from 'react';
import '../styles/Navbar.css'; // Import the CSS for this component

import githubLogo from '../icons/git-logo.png';

function Navbar({ onProjectNameClick }) {
  return (
    <div className="navbar">
      <div className="navbar-content">
        <button className="project-button" onClick={onProjectNameClick}>

          <h3>JobFlow - Israel</h3>
        </button>

        <a className="github-link" href="https://github.com/Qehbr/JobFlow-Israel">
          <img src={githubLogo} alt="GitHub Logo" className="git-icon" />
        </a>
      </div>
    </div>
  );
}
export default Navbar;
