import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import CarbonPredictionForm from './CarbonPredictionForm';
import ElectricityPredictionForm from './ElectricityPredictionForm';

function App() {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li><Link to="/carbon">Carbon Emission Prediction</Link></li>
            <li><Link to="/electricity">Electricity Bill Prediction</Link></li>
          </ul>
        </nav>
        <Routes>
          <Route path="/carbon" element={<CarbonPredictionForm />} />
          <Route path="/electricity" element={<ElectricityPredictionForm />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;