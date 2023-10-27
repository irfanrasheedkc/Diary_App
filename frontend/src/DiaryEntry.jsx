// DiaryEntry.js

import React from 'react';
import './DiaryEntry.css';

const DiaryEntry = ({ date, entry }) => {
  return (
    <div className="entry-container">
      <div className="entry">
        <h3>{date}</h3>
        <p>{entry}</p>
      </div>
    </div>
  );
};

export default DiaryEntry;
