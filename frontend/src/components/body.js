import React from 'react'
import PredictionForm from './PredictionForm'

const body = () => {
  return (
    <div>
        <header className="App-header">
        <h1 style={styles.heading}>Carbon Emission Prediction</h1>
      </header>
      <main>
        <PredictionForm />
      </main>
      
    </div>
  )
}

const styles = {
    heading: {
      textAlign: 'center',
      color: 'green',
    }
};
  

export default body
