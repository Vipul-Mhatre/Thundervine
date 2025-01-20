import pandas as pd
from sklearn.linear_model import LinearRegression
from sklearn.preprocessing import StandardScaler, OneHotEncoder
from sklearn.compose import ColumnTransformer
from sklearn.pipeline import Pipeline
import joblib  # For saving the model

# Step 1: Load the full training data (Assumed to be large dataset)
train_data = pd.read_csv('../data/electricity_bill_dataset.csv')  # Replace with the actual file path

# Step 2: Prepare the training data
X_train = train_data.drop('ElectricityBill', axis=1)  # All columns except the target
y_train = train_data['ElectricityBill']  # Target variable

# Step 3: Prepare the preprocessing pipeline
preprocessor = ColumnTransformer(
    transformers=[
        ('num', StandardScaler(), ['Fan', 'Refrigerator', 'AirConditioner', 'Television', 'MotorPump', 'MonthlyHours', 'TariffRate']),
        ('cat', OneHotEncoder(), ['City', 'Company'])
    ])

model = Pipeline(steps=[
    ('preprocessor', preprocessor),
    ('regressor', LinearRegression())
])

model.fit(X_train, y_train)

model_filename = '../backend/electricity_bill_model.pkl'  # Path to save the model
joblib.dump(model, model_filename)
print(f"Model saved to {model_filename}")

test_data = pd.DataFrame({
    'Fan': [16, 19, 7, 7, 11, 13, 23, 22, 8, 10, 16, 5],
    'Refrigerator': [23.0, 22.0, 20.0, 22.0, 23.0, 22.0, 22.0, 23.0, 20.0, 23.0, 22.0, 19.0],
    'AirConditioner': [2.0, 2.0, 2.0, 3.0, 2.0, 0.0, 3.0, 0.0, 2.0, 0.0, 3.0, 2.0],
    'Television': [6.0, 3.0, 6.0, 21.0, 11.0, 18.0, 20.0, 21.0, 8.0, 18.0, 14.0, 20.0],
    'MotorPump': [1.0, 1.0, 7.0, 1.0, 1.0, 1.0, 12.0, 1.0, 1.0, 7.0, 1.0, 1.0],
    'Month': [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    'City': ['Hyderabad', 'Vadodara', 'Shimla', 'Mumbai', 'Mumbai', 'Ratnagiri', 'New Delhi', 'New Delhi', 'New Delhi', 'Dahej', 'Ahmedabad', 'Mumbai'],
    'Company': ['Tata Power Company Ltd.', 'NHPC', 'Jyoti Structure', 'Power Grid Corp', 'Ratnagiri Gas and Power Pvt. Ltd. (RGPPL)', 'Adani Power Ltd.', 'Kalpataru Power', 'Adani Power Ltd.', 'Orient Green', 'Sterlite Power Transmission Ltd', 'Neueon Towers / Sujana Towers Ltd.', 'Sterlite Power Transmission Ltd'],
    'MonthlyHours': [384, 488, 416, 475, 457, 471, 755, 492, 546, 578, 450, 493],
    'TariffRate': [8.4, 7.8, 7.7, 9.2, 9.2, 7.4, 8.5, 8.5, 8.5, 7.6, 7.9, 9.2],
    'ElectricityBill': [3225.6, 3806.4, 3203.2, 4370.0, 4204.4, 3485.4, 6417.5, 4182.0, 4641.0, 4392.8, 3555.0, 4535.6]
})

X_test = test_data.drop('ElectricityBill', axis=1)

model = joblib.load('../backend/electricity_bill_model.pkl')  

y_pred = model.predict(X_test)

print("Predicted Electricity Bills for the test data:")
print(y_pred)