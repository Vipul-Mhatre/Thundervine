from flask import Flask, request, jsonify
from flask_cors import CORS
import joblib
import pandas as pd

app = Flask(__name__)
CORS(app) 

model_path = 'carbon_emission_model.pkl'
carbon_model = joblib.load(model_path)

@app.route('/')
def home():
    return "Welcome to the Carbon Emission Prediction API!"

@app.route('/predict', methods=['POST'])
def predict():
    try:
        input_data = request.json
        input_df = pd.DataFrame([input_data])  
        prediction = carbon_model.predict(input_df)
        result = {'CarbonEmission': prediction[0]}
        return jsonify(result)
    except Exception as e:
        return jsonify({'error': str(e)})

if __name__ == '__main__':
    app.run(debug=True)