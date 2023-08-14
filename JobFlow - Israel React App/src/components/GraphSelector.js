import React from 'react';
import '../styles/GraphSelector.scss';

function GraphSelector({ onSelect }) {
  const titleTypes = ['All', 'Developer', 'Software Engineer', 'Student/Intern', 'Engineer', '(Data) Analyst', 'Other', 'QA', 'Data Scientist'];

  return (
    <div className="graph-selector">
      <h1>Choose Role:</h1>
      <select onChange={(e) => onSelect(e.target.value)}>
        {titleTypes.map((type, index) => (
          <option key={index} value={type}>
            {type}
          </option>
        ))}
      </select>
    </div>
  );
}

export default GraphSelector;
