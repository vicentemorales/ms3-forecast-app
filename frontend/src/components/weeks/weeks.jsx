import React, { useState, useEffect } from 'react';
import axios from 'axios';
import'./weeks.css'

function Weeks() {
  const [weekData, setWeekData] = useState([]);

  useEffect(() => {
    // Fetch data from your Python backend
    axios.get('http://localhost:5000/weeks')
        .then((response) => {
        setWeekData(response.data);
        })
        .catch((error) => {
        console.error('Error fetching data:', error);
        });
    
  }, []);

  return (
    <div className="Weeks">
      <h2>Production Weeks (starting Sunday date)</h2>
      <ul className='week-list'>
        {weekData.map((week) => (
          <li key={week.primary_id}>{week.week}</li>
        ))}
      </ul>
    </div>
  );
}

export default Weeks;
