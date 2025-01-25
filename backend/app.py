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
        print(input_data)  # Debugging to check the input data
        model_columns = [
            'fan', 'refrigerator', 'airConditioner', 'television', 'motorPump',
            'month', 'tariffRate', 'monthlyHours',
            # Add the expected dummy columns based on the training set
            'city_Mumbai', 'city_New Delhi',  # Assuming 'city' had 2 values during training
            'company_Power Grid Corp', 'company_Adani Power Ltd.',  # Same for 'company'
            'temperaturePreference', 'renewableEnergy'
        ]
        
        # Initialize default values for missing columns
        input_data_with_defaults = input_data.copy()

        # Convert only appliance usage values to integers (ignore categorical fields like city)
        for appliance in input_data_with_defaults['appliances']:
            # Ensure we're only converting appliance values, not categorical fields like 'city'
            if appliance in ['fan', 'refrigerator', 'airConditioner', 'television', 'motorPump', 'lighting']:
                input_data_with_defaults['appliances'][appliance] = int(input_data_with_defaults['appliances'][appliance])

        # Convert categorical features like 'city' and 'company' to dummy variables
        input_df = pd.DataFrame([input_data_with_defaults])
        input_df = pd.get_dummies(input_df, columns=['city', 'company'], drop_first=True)

        # Make sure the column names match exactly the ones used during training
        # Fix case sensitivity for appliance columns
        input_df.columns = [col.lower() if col not in ['city_mumbai', 'company_power grid corp'] else col for col in input_df.columns]

        # Ensure all columns required by the model are present
        for col in model_columns:
            if col not in input_df.columns:
                input_df[col] = 0  # Set missing columns to 0

        # Reorder the columns to match the order used during training
        input_df = input_df[model_columns]

        # Make the prediction using the trained model
        prediction = electricity_model.predict(input_df)
        electricity_bill = prediction[0]

        # Generate energy savings suggestion based on input data
        savings_suggestion = generate_energy_savings_suggestion(input_data_with_defaults)

        # Return the result
        result = {
            'ElectricityBill': electricity_bill,
            'savingsSuggestion': savings_suggestion
        }
        return jsonify(result)

    except Exception as e:
        print(f"Error: {e}")  # Debugging to print the error
        return jsonify({'error': str(e)})

# # Function to generate energy savings suggestion
# def generate_energy_savings_suggestion(input_data):
#     # Example suggestion logic
#     if input_data['appliances']['airConditioner'] > 5:
#         return "Consider reducing the usage of your air conditioner to save energy."
#     elif input_data['appliances']['fan'] > 10:
#         return "Using the fan efficiently could save energy. Try reducing the usage if possible."
#     else:
#         return "You are using your appliances in an optimal way. Keep it up!"

def generate_energy_savings_suggestion(input_data):
    if input_data['airConditioner'] > 5:
        return "Consider reducing the usage of your air conditioner to save energy."
    elif input_data['fan'] > 10:
        return "Using the fan efficiently could save energy. Try reducing the usage if possible."
    else:
        return "You are using your appliances in an optimal way. Keep it up!"

def generate_energy_savings_suggestion(input_data):
    suggestions = []
    
    fan_usage = input_data.get('fan', 0)
    refrigerator_usage = input_data.get('refrigerator', 0)
    air_conditioner_usage = input_data.get('airConditioner', 0)
    television_usage = input_data.get('television', 0)
    lighting_usage = input_data.get('lighting', 0)
    motor_pump_usage = input_data.get('motorPump', 0)
    
    tariff_rate = input_data.get('tariffRate', 0)
    renewable_energy = input_data.get('renewableEnergy', False)
    month = input_data.get('month', "")
    city = input_data.get('city', "")
    temperature_preference = input_data.get('temperaturePreference', 0)

    if air_conditioner_usage > 4:
        suggestions.append("Consider reducing your air conditioner usage, as it tends to consume a lot of energy. Set the thermostat to a higher temperature or use it less.")
    
    if motor_pump_usage > 3:
        suggestions.append("Motor pumps are energy-intensive. Try using them only when necessary or consider using a more efficient model.")
    
    if lighting_usage > 8:
        suggestions.append("You are using lights for extended periods. Try switching to energy-efficient LED lights or using them less.")
    
    if fan_usage > 6:
        suggestions.append("You are using the fan for a long time. Consider switching it off when not in use or adjusting the fan speed for energy savings.")
    
    if refrigerator_usage > 6:
        suggestions.append("Ensure your refrigerator is set at an optimal temperature (3-5°C). Avoid keeping the door open for long to save energy.")

    if tariff_rate > 8:
        suggestions.append("You have a high tariff rate. Try to minimize the use of energy-intensive appliances, or shift usage to off-peak hours if possible.")

    if renewable_energy:
        suggestions.append("Since you are using renewable energy, consider increasing its usage. Reducing reliance on the grid can save money and reduce your carbon footprint.")
    else:
        suggestions.append("Consider installing renewable energy sources like solar panels. This can help reduce your dependence on the grid and lower your electricity bill in the long run.")

    if month in ["March", "April", "May", "June", "July", "August"]:
        suggestions.append("During the summer months, cooling appliances like air conditioners and fans are used more. Try setting your AC to a higher temperature and using fans as a supplement.")
    
    if month in ["November", "December", "January", "February"]:
        suggestions.append("During winter months, try reducing the heating or cooling needs and adjust your thermostat to save energy.")

    if temperature_preference > 24:
        suggestions.append("Consider setting your indoor temperature to a more energy-efficient level, such as 22°C, to reduce cooling/heating demands.")

    if not suggestions:
        suggestions.append("Your energy consumption seems efficient. Keep monitoring your usage to maintain optimal energy efficiency.")

    savings_suggestion = " ".join(suggestions)
    return savings_suggestion

if __name__ == '__main__':
    app.run(debug=True)