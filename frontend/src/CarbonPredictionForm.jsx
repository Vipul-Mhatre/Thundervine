import React, { useState } from 'react';
import axios from 'axios';

const PredictionForm = () => {
  const [formData, setFormData] = useState({
    "Body Type": "",
    "Sex": "",
    "Diet": "",
    "How Often Shower": "",
    "Heating Energy Source": "",
    "Transport": "",
    "Vehicle Monthly Distance Km": "",
    "Waste Bag Weekly Count": "",
    "How Long TV PC Daily Hour": "",
    "How Many New Clothes Monthly": "",
    "How Long Internet Daily Hour": "",
    "Energy efficiency": ""
  });

  const [prediction, setPrediction] = useState(null);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setPrediction(null);

    try {
      const response = await axios.post('http://127.0.0.1:5000/predict/carbon', formData);
      setPrediction(response.data.CarbonEmission);
    } catch (err) {
      setError(err.message || 'An error occurred');
    }
  };

  const bodyTypeOptions = [ "Obese", 
    "Underweight", 
    "Normal", 
    "Overweight"
  ];
  const sexOptions = ["Male", "Female", "Other"];
  const dietOptions = ["Omnivore", "Vegetarian", "Vegan"];
  const heatingEnergySourceOptions = ["Gas", "Electricity", "Solar", "Other"];
  const transportOptions = ["Car", "Bus", "Train", "Bicycle", "Walk"];

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Enter Your Details</h2>
      <form onSubmit={handleSubmit} style={styles.form}>
        {Object.keys(formData).map((key) => {
          if (key === "Body Type") {
            return (
              <div key={key} style={styles.formGroup}>
                <label style={styles.label}>{key}:</label>
                <select
                  name={key}
                  value={formData[key]}
                  onChange={handleChange}
                  required
                  style={styles.input}
                >
                  <option value="">Select Body Type</option>
                  {bodyTypeOptions.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </div>
            );
          } else if (key === "Sex") {
            return (
              <div key={key} style={styles.formGroup}>
                <label style={styles.label}>{key}:</label>
                <select
                  name={key}
                  value={formData[key]}
                  onChange={handleChange}
                  required
                  style={styles.input}
                >
                  <option value="">Select Sex</option>
                  {sexOptions.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </div>
            );
          } else if (key === "Diet") {
            return (
              <div key={key} style={styles.formGroup}>
                <label style={styles.label}>{key}:</label>
                <select
                  name={key}
                  value={formData[key]}
                  onChange={handleChange}
                  required
                  style={styles.input}
                >
                  <option value="">Select Diet</option>
                  {dietOptions.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </div>
            );
          } else if (key === "Heating Energy Source") {
            return (
              <div key={key} style={styles.formGroup}>
                <label style={styles.label}>{key}:</label>
                <select
                  name={key}
                  value={formData[key]}
                  onChange={handleChange}
                  required
                  style={styles.input}
                >
                  <option value="">Select Heating Energy Source</option>
                  {heatingEnergySourceOptions.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </div>
            );
          } else if (key === "Transport") {
            return (
              <div key={key} style={styles.formGroup}>
                <label style={styles.label}>{key}:</label>
                <select
                  name={key}
                  value={formData[key]}
                  onChange={handleChange}
                  required
                  style={styles.input}
                >
                  <option value="">Select Transport</option>
                  {transportOptions.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </div>
            );
          } else {
            return (
              <div key={key} style={styles.formGroup}>
                <label style={styles.label}>{key}:</label>
                <input
                  type="text"
                  name={key}
                  value={formData[key]}
                  onChange={handleChange}
                  required
                  style={styles.input}
                />
              </div>
            );
          }
        })}
        <button type="submit" style={styles.button}>Predict</button>
      </form>

      {prediction !== null && (
        <div style={styles.result}>
          <h3>Predicted Carbon Emission:</h3>
          <p>{prediction.toFixed(2)}</p>
        </div>
      )}

      {error && (
        <div style={styles.error}>
          <h3>Error:</h3>
          <p>{error}</p>
        </div>
      )}
    </div>
  );
};

const styles = {
  container: {
    fontFamily: 'Arial, sans-serif',
    maxWidth: '600px',
    margin: '0 auto',
    padding: '20px',
    backgroundColor: '#f9f9f9',
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  },
  heading: {
    textAlign: 'center',
    marginBottom: '20px',
    color: '#333',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
  },
  formGroup: {
    marginBottom: '15px',
  },
  label: {
    fontSize: '16px',
    fontWeight: 'bold',
    color: '#555',
    marginBottom: '5px',
  },
  input: {
    padding: '10px',
    fontSize: '14px',
    border: '1px solid #ccc',
    borderRadius: '5px',
    width: '100%',
    boxSizing: 'border-box',
  },
  button: {
    padding: '12px',
    fontSize: '16px',
    color: '#fff',
    backgroundColor: '#4CAF50',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
  },
  buttonHover: {
    backgroundColor: '#45a049',
  },
  result: {
    marginTop: '20px',
    textAlign: 'center',
    fontSize: '18px',
    color: '#333',
  },
  error: {
    marginTop: '20px',
    textAlign: 'center',
    fontSize: '16px',
    color: 'red',
  },
};

export default PredictionForm;