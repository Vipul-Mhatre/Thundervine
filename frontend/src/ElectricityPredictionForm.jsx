import React, { useState } from 'react';
import axios from 'axios';

const ElectricityPredictionForm = () => {
  const [formData, setFormData] = useState({
    Fan: "",
    Refrigerator: "",
    AirConditioner: "",
    Television: "",
    Monitor: "",
    MotorPump: "",
    Month: "",
    City: "",
    Company: "",
    MonthlyHours: "",
    TariffRate: ""
  });
  const [prediction, setPrediction] = useState(null);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setPrediction(null);

    try {
      const response = await axios.post('http://127.0.0.1:5000/predict/electricity', formData);
      setPrediction(response.data.ElectricityBill);
    } catch (err) {
      setError(err.message || 'An error occurred');
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4 text-center">Electricity Bill Prediction</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {Object.keys(formData).map((key) => (
          <div key={key}>
            <label className="block text-sm font-medium text-gray-700">{key}:</label>
            <input
              type={key === "Month" || key === "MonthlyHours" || key === "TariffRate" ? "number" : "text"}
              name={key}
              value={formData[key]}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
        ))}
        <button
          type="submit"
          className="w-full py-2 px-4 bg-indigo-600 text-white font-semibold rounded-md shadow hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          Predict
        </button>
      </form>
      {prediction && <div className="mt-4 text-green-600">Prediction: {prediction}</div>}
      {error && <div className="mt-4 text-red-600">Error: {error}</div>}
    </div>
  );
};

export default ElectricityPredictionForm;