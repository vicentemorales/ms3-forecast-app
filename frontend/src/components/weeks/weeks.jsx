import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './weeks.css';
import { BrowserRouter as Router, Link } from 'react-router-dom';

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

  // Function to group weeks by year
  const groupWeeksByYear = (weeks) => {
    const groupedWeeks = {};
    weeks.forEach((week) => {
      const year = new Date(week.week).getFullYear();
      if (!groupedWeeks[year]) {
        groupedWeeks[year] = [];
      }
      groupedWeeks[year].push(week);
    });
    return groupedWeeks;
  };

  const groupedWeeks = groupWeeksByYear(weekData);

  return (
    <div className="Weeks">
      <h2>Production Weeks (starting Sunday date)</h2>
      <Router> {/* Wrap your component with Router */}
        {Object.keys(groupedWeeks).map((year) => (
          <div key={year}>
            <h3>{year}</h3>
            <ul className="week-list">
              {groupedWeeks[year].map((week) => (
                <li key={week.primary_id} className='sunday-date'>
                  {/* Use Link to create individual links */}
                  <Link to={`/weeks/${week.primary_id}`}>wk of {week.week}</Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </Router> {/* Close the Router component */}
    </div>
  );
}

export default Weeks;
