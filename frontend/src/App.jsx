import React from 'react';
import { BrowserRouter, Route, Routes} from 'react-router-dom';
import Header from './components/header/header';
import Home from './components/home/home';
import Weeks from './components/weeks/weeks';

function App() {
  return (
    <div className="App">
      <Header />
      <BrowserRouter>
        <Routes>
          <Route exact path='/' element={<Home />} />
          <Route exact path='/weeks' element={<Weeks />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
