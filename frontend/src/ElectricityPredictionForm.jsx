import React, { useState } from 'react';
import axios from 'axios';
import { Bar, Pie } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement);

const EnergyEfficiencyForm = () => {
  const [formData, setFormData] = useState({
    appliances: {
      fan: 0,
      refrigerator: 0,
      airConditioner: 0,
      television: 0,
      lighting: 0,
      motorPump: 0,
    },
    month: "",
    city: "",
    company: "",
    tariffRate: 0,
    renewableEnergy: false,
    temperaturePreference: 0,
    monthlyHours: 0, 
  });
  const [prediction, setPrediction] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [chartData, setChartData] = useState(null);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
      appliances: {
        ...prev.appliances,
        [name]: type === 'checkbox' ? checked : value,
      }
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setPrediction(null);
    setLoading(true);

    try {
      const response = await axios.post('http://127.0.0.1:5000/predict/electricity', formData);
      const electricityBill = response.data.ElectricityBill;
      const savingsSuggestion = response.data.savingsSuggestion; // Assuming backend provides this

      setPrediction(electricityBill);
      setChartData({
        labels: Object.keys(formData.appliances),
        datasets: [
          {
            label: 'Appliance Usage (in hours)',
            data: Object.values(formData.appliances),
            backgroundColor: 'rgba(75, 192, 192, 0.6)',
          },
        ],
      });

      alert(savingsSuggestion);
    } catch (err) {
      setError(err.message || 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const pieChartData = {
    labels: Object.keys(formData.appliances),
    datasets: [
      {
        label: 'Appliance Usage',
        data: Object.values(formData.appliances),
        backgroundColor: ['#ff9999', '#66b3ff', '#99ff99', '#ffcc99', '#ffb3e6', '#ff6666'],
      },
    ],
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4 text-center">Microbiome-Inspired Energy Efficiency</h2>
      <p className="text-sm text-gray-600 mb-4">
        Use this form to monitor and optimize your energy usage for improved efficiency.
      </p>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Select your city:</label>
          <select
            name="city"
            value={formData.city}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
          >
            <option value="">Choose City</option>
            <option value="Hyderabad">Hyderabad</option>
            <option value="Mumbai">Mumbai</option>
            <option value="Delhi">Delhi</option>
            <option value="Vadodara">Vadodara</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">How many hours do you use these appliances each day?</label>
          {['fan', 'refrigerator', 'airConditioner', 'television', 'lighting', 'motorPump'].map((appliance) => (
            <div key={appliance}>
              <label className="block text-sm">{appliance.charAt(0).toUpperCase() + appliance.slice(1)}:</label>
              <input
                type="number"
                name={appliance}
                value={formData.appliances[appliance]}
                onChange={handleChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
                placeholder={`Enter hours for ${appliance}`}
              />
            </div>
          ))}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Renewable Energy (Is it part of your system?):</label>
          <input
            type="checkbox"
            name="renewableEnergy"
            checked={formData.renewableEnergy}
            onChange={handleChange}
            className="mt-1"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Ideal Indoor Temperature (°C):</label>
          <input
            type="number"
            name="temperaturePreference"
            value={formData.temperaturePreference}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
            placeholder="Enter your ideal indoor temperature"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Your Electricity Company:</label>
          <select
            name="company"
            value={formData.company}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
          >
            <option value="">Choose Company</option>
            <option value="Tata Power Company Ltd.">Tata Power</option>
            <option value="Power Grid Corp">Power Grid</option>
            <option value="Adani Power Ltd.">Adani Power</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Tariff Rate (Cost per unit in ₹):</label>
          <input
            type="number"
            name="tariffRate"
            value={formData.tariffRate}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
            placeholder="Enter tariff rate"
          />
        </div>

        <button
          type="submit"
          className="w-full py-2 px-4 bg-indigo-600 text-white font-semibold rounded-md shadow hover:bg-indigo-700 focus:outline-none"
        >
          {loading ? "Predicting..." : "Predict"}
        </button>
      </form>

      {prediction && (
        <div className="mt-4 text-green-600">
          <h3 className="font-semibold">Your Predicted Electricity Bill:</h3>
          <p>₹{prediction}</p>
          <p className="text-sm text-gray-500">
            This prediction is based on the information you provided. You can lower your bill by reducing appliance usage or improving efficiency!
          </p>
        </div>
      )}

      {chartData && (
        <div className="mt-6">
          <h3 className="font-semibold text-lg">Appliance Usage (Bar Chart):</h3>
          <Bar data={chartData} options={{ responsive: true, scales: { y: { beginAtZero: true } } }} />
        </div>
      )}

      <div className="mt-6">
        <h3 className="font-semibold text-lg">Appliance Usage (Pie Chart):</h3>
        <Pie data={pieChartData} options={{ responsive: true }} />
      </div>

      {error && <div className="mt-4 text-red-600">Error: {error}</div>}
    </div>
  );
};

export default EnergyEfficiencyForm;