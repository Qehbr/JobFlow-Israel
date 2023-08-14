import React, { useEffect, useState } from 'react';
import { db } from "../config/firebase";
import { getDocs, collection } from "firebase/firestore";
import JobTitlesGraph from './JobTitlesGraph';
import LocationGraph from './LocationGraph';
import KeywordsGraph from './KeywordsGraph';
import CompanyInfoGraph from './CompanyInfoGraph';
import EasyApplyGraph from './EasyApplyGraph';
import GraphSelector from './GraphSelector';
import '../styles/GraphsSection.css';
import Popup from './Popup'; // Import the Popup component

function GraphsSection() {
  const [jobsData, setJobsData] = useState([]);
  const [selectedTitleType, setSelectedTitleType] = useState('All');
  const [filteredJobsData, setFilteredJobsData] = useState([]);
  const [errorPopup, setErrorPopup] = useState(false);

  const getJobsData = async () => {
    try {
      const data = await getDocs(collection(db, "jobs"));
      const jobsDataArray = [];
      data.forEach((doc) => {
        jobsDataArray.push(doc.data());
      });
      setJobsData(jobsDataArray);
      setFilteredJobsData(jobsDataArray);
    } catch (err) {
      console.error(err);
      setErrorPopup(true);
    }
  };

  useEffect(() => {
    getJobsData();
  }, []);

  useEffect(() => {
    if (selectedTitleType === 'All') {
      setFilteredJobsData(jobsData);
    } else {
      const filteredData = jobsData.filter(job => job.title === selectedTitleType);
      setFilteredJobsData(filteredData);
    }
  }, [selectedTitleType, jobsData]);

  return (
    <div className="graph-section">
      <GraphSelector onSelect={setSelectedTitleType} />
      {selectedTitleType === 'All' && (
        <div className="row-container">
          <div className="graph-container">
            <JobTitlesGraph jobsData={filteredJobsData} />
          </div>
        </div>
      )}
      <div className="row-container">
        <div className="graph-container">
          <KeywordsGraph jobsData={filteredJobsData} />
        </div>
        <div className="graph-container">
          <EasyApplyGraph jobsData={filteredJobsData} />
        </div>
      </div>
      <div className="row-container">
        <div className="graph-container">
          <LocationGraph jobsData={filteredJobsData} />
        </div>
      </div>
      <div className="row-container">
        <div className="graph-container">
          <CompanyInfoGraph jobsData={filteredJobsData} />
        </div>
      </div>
      {errorPopup && (
        <Popup onClose={() => setErrorPopup(false)} />
      )}
    </div>
    
  );
}

export default GraphsSection;
