import React, { useState, useEffect } from 'react';
import './App.css';
import DiaryEntry from './DiaryEntry';
import DiaryInput from './DiaryInput';
import Dornut from './Dornut';

function App() {

  const [entries, setEntries] = useState([]);

  // Create a function to fetch entries from the API
  const fetchEntriesFromAPI = () => {
    fetch('http://localhost:5000/entries') // Replace with your API endpoint
      .then((response) => response.json())
      .then((data) => setEntries(data))
      .catch((error) => console.error('Error fetching entries:', error));
    
  };

  // Use this useEffect to fetch data when the component mounts
  useEffect(() => {
    fetchEntriesFromAPI();
  }, []);


  const saveEntry = (newEntry) => {
    setEntries([...entries, newEntry]);
    // Make an API POST request using the fetch API
    fetch('http://localhost:5000/store', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newEntry),
    })
      .then((response) => {
        fetchEntriesFromAPI();
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        console.log('Entry saved:', data);
      })
      .catch((error) => {
        console.error('Error saving entry:', error);
      });

  };
    // list 
    
    // count number of positives
    
  
  return (
    <div className="App">
      
    <Dornut entries={entries}/> 
  
      <DiaryInput onSaveEntry={saveEntry} />
      <div className="entry-grid"> {/* Add a class for the grid layout */}
        {entries.map((entry, index) => (
          <DiaryEntry key={index} date={entry.date} entry={entry.entry} emotion={entry.emotion} response={entry.response} />
        ))}
      </div>
    </div>
  );

}


export default App;
