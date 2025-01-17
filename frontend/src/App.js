import React from 'react';
import PredictionForm from './PredictionForm';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1 style={styles.heading}>Carbon Emission Prediction</h1>
      </header>
      <main>
        <PredictionForm />
      </main>
    </div>
  );
}

const styles = {
  heading: {
    textAlign: 'center',
    color: 'green',
  }
};

export default App;