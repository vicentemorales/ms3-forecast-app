import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './weeks.css';
import { Link } from 'react-router-dom'; // Import the Link component for routing

function Weeks({ setSelectedWeek }) {
  // State to hold the week data fetched from the backend
  const [weekData, setWeekData] = useState([]);

  // UseEffect hook to fetch data from the Python backend when the component mounts
  useEffect(() => {
    // Fetch data from your Python backend
    axios.get('http://localhost:5000/weeks')
      .then((response) => {
        // Set the fetched week data in the state
        setWeekData(response.data);
      })
      .catch((error) => {
        // Handle errors if the data fetch fails
        console.error('Error fetching data:', error);
      });
  }, []); // The empty dependency array ensures this effect runs once, similar to componentDidMount

  // Function to group weeks by their respective years
  const groupWeeksByYear = (weeks) => {
    const groupedWeeks = {}; // Initialize an empty object to store grouped weeks
    weeks.forEach((week) => {
      const year = new Date(week.week).getFullYear(); // Extract the year from the week date
      if (!groupedWeeks[year]) {
        groupedWeeks[year] = []; // Create an array for each year if it doesn't exist
      }
      groupedWeeks[year].push(week); // Push the week data into the respective year's array
    });
    return groupedWeeks; // Return the grouped weeks object
  };

  // Group the fetched week data by year using the groupWeeksByYear function
  const groupedWeeks = groupWeeksByYear(weekData);

  return (
    <div className="Weeks">
      <h2>Production Weeks (starting Sunday date)</h2>
      {/* Loop through the groupedWeeks object and render each year's weeks */}
      {Object.keys(groupedWeeks).map((year) => (
        <div key={year}>
          <h3 className='year-subheader'>{year}</h3>
          <ul className="week-list">
            {/* Loop through the weeks within each year and create links */}
            {groupedWeeks[year].map((week) => (
              <li key={week.primary_id} className='sunday-date' style={{maxWidth: '150px'}}>
                {/* Use the Link component to create individual links with dynamic URLs */}
                <Link
                  to={`/weeks/${week.primary_id}`}
                  style={{maxWidth: '150px'}}
                  onClick={() => setSelectedWeek(week.primary_id)} // Set the selectedWeek when clicking the link
                >
                  wk of {week.week}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

export default Weeks;
