import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import Weather1 from './components/Weather1';
import PreviousWeekWeather from './components/PreviousWeekWeather';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Weather1" element={<Weather1 />} />
          <Route path="/PreviousWeekWeather" element={<PreviousWeekWeather />} />
          {/* Add other routes as needed */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
