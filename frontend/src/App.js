import React, { useState } from 'react';
import './App.css';
import DiaryEntry from './DiaryEntry';
import DiaryInput from './DiaryInput';

function App() {

  const [entries, setEntries] = useState([]);

  const saveEntry = (newEntry) => {
    setEntries([...entries, newEntry]);
  };

  return (
    <div className="App">
      <main>
        <DiaryInput onSaveEntry={saveEntry} />
        {entries.map((entry, index) => (
          <DiaryEntry key={index} date={entry.date} entry={entry.entry} />
        ))}
      </main>
    </div>
  );
}

export default App;
