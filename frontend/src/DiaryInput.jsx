// DiaryInput.js

import React, { useState, useEffect } from 'react';

const DiaryInput = ({ onSaveEntry }) => {
  const [entries, setEntries] = useState([]);

  useEffect(() => {
    // Fetch all entries from the database when the component mounts
    fetch('http://localhost:5000/entries')  // Replace with your API endpoint
      .then((response) => response.json())
      .then((data) => setEntries(data))
      .catch((error) => console.error('Error fetching entries:', error));
  }, []);

  const [date, setDate] = useState('');
  const [entry, setEntry] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSaveEntry({ date, entry });

    const dataToSend = {
      date: date,
      entry: entry
    };

    // Make an API POST request using the fetch API
    fetch('http://localhost:5000/store', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(dataToSend),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        console.log('Entry saved:', data);

        // Call the onSaveEntry function to update the parent component
        onSaveEntry(dataToSend);

        // Clear the form
        setDate('');
        setEntry('');
      })
      .catch((error) => {
        console.error('Error saving entry:', error);
      });

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
