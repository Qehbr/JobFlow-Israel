// App.js
import React, { useState } from 'react';
import './styles/App.css';
import Navbar from './components/Navbar';
import IntroSection from './components/IntroSection';
import GraphsSection from './components/GraphsSection';
import WaveComponent from './components/WaveComponent';

function App() {
  const [showGraphs, setShowGraphs] = useState(false);

  const handleStartClick = () => {
    setShowGraphs(true);
  };

  const handleProjectNameClick = () => {
    setShowGraphs(false);
  };

  return (
    <div className="App">
      <Navbar
        onProjectNameClick={handleProjectNameClick}
      />
      <div className="content-container">
        {showGraphs ? (
          <GraphsSection />
        ) : (
          <IntroSection onStartClick={handleStartClick} />
        )}
      </div>
      {!showGraphs && <WaveComponent />} {/* Hide WaveComponent when showGraphs is true */}
    </div>
  );
}
export default App;
