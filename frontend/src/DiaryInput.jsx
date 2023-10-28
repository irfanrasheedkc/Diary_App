// DiaryInput.js

import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import './DiaryInput.css'; // Add your custom CSS for additional styling

const DiaryInput = ({ onSaveEntry }) => {
  const [date, setDate] = useState('');
  const [entry, setEntry] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    const dataToSend = {
      date: date,
      entry: entry
    };

    onSaveEntry(dataToSend);

    setDate('');
    setEntry('');
  };

  return (
    <form onSubmit={handleSubmit} className="diary-form">
      <div className="form-group">
        <label htmlFor="date">Date:</label>
        <input
          type="date"
          id="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="form-control" // Apply Bootstrap's form control class
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="entry">Diary Entry:</label>
        <textarea
          id="entry"
          value={entry}
          onChange={(e) => setEntry(e.target.value)}
          className="form-control" // Apply Bootstrap's form control class
          rows={4}
          required
        />
      </div>
      <button type="submit" className="btn btn-primary">Save Entry</button>
    </form>
  );
};

export default DiaryInput;
