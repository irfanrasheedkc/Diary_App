// DiaryEntry.js

import React from 'react';
import './DiaryEntry.css';

const DiaryEntry = ({ date, entry, emotion, response }) => {
  return (
    <div className="entry-container">
      <div className="entry">
        <h3>{date}</h3>
        <p>{entry}</p>
        <p>{emotion}</p>
        <p>{response}</p>
      </div>
    </div>
  );
};

export default DiaryEntry;
