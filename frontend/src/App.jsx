import React, { useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Header from './components/header/header';
import Home from './components/home/home';
import Weeks from './components/weeks/weeks';
import ProcessingPlan from './components/processingPlan/processingPlan'; // Import the ProcessingPlan component
import ProcessingSubmission from './components/processingSubmission/processingSubmission';

function App() {
  // State to hold the selected week's data
  const [selectedWeek, setSelectedWeek] = useState(null);

  return (
    <div className="App">
      <Header />
      <BrowserRouter>
        <Routes>
          <Route exact path='/' element={<Home />} />
          <Route exact path='/weeks' element={<Weeks setSelectedWeek={setSelectedWeek} />} />
          {/* Pass selectedWeek to ProcessingPlan component */}
          <Route path='/weeks/:weekId' element={<ProcessingPlan selectedWeek={selectedWeek} />} />
          <Route path='/weeks/:weekId/:skuId/processing-submission' element={<ProcessingSubmission selectedWeek={selectedWeek} />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
