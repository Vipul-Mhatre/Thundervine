import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import CarbonPredictionForm from './components/CarbonPredictionForm';
import ElectricityPredictionForm from './components/ElectricityPredictionForm';

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
        <Switch>
          <Route path="/carbon" component={CarbonPredictionForm} />
          <Route path="/electricity" component={ElectricityPredictionForm} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;