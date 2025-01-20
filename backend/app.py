from flask import Flask, request, jsonify
from flask_cors import CORS
import joblib
import pandas as pd

app = Flask(__name__)
CORS(app)

carbon_model_path = 'carbon_emission_model.pkl'
electricity_model_path = 'electricity_bill_model.pkl'
carbon_model = joblib.load(carbon_model_path, mmap_mode='r')
electricity_model = joblib.load(electricity_model_path, mmap_mode='r')

@app.route('/')
def home():
    return "Welcome to the Thundervine Backend!"

@app.route('/predict/carbon', methods=['POST'])
def predict_carbon():
    try:
        input_data = request.json
        input_df = pd.DataFrame([input_data])
        prediction = carbon_model.predict(input_df)
        result = {'CarbonEmission': prediction[0]}
        return jsonify(result)
    except Exception as e:
        return jsonify({'error': str(e)})

@app.route('/predict/electricity', methods=['POST'])
def predict_electricity():
    try:
        input_data = request.json
        input_df = pd.DataFrame([input_data])
        input_df = pd.get_dummies(input_df) 
        prediction = electricity_model.predict(input_df)
        result = {'ElectricityBill': prediction[0]}
        return jsonify(result)
    except Exception as e:
        return jsonify({'error': str(e)})

if __name__ == '__main__':
    app.run(debug=True)