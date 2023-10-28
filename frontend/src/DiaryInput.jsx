// DiaryInput.js

import React, { useState, useEffect } from 'react';

const DiaryInput = ({ onSaveEntry }) => {
  const [date, setDate] = useState('');
  const [entry, setEntry] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSaveEntry({ date, entry });

    setDate('');
    setEntry('');


  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Date:</label>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Diary Entry:</label>
        <textarea
          value={entry}
          onChange={(e) => setEntry(e.target.value)}
          rows={4}
          cols={50}
          required
        />
      </div>
      <button type="submit">Save Entry</button>
    </form>
  );
};

export default DiaryInput;
