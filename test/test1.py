import pandas as pd
import pickle
from sklearn.linear_model import LinearRegression
from sklearn.model_selection import train_test_split
import os

df = pd.read_csv('../data/Household_power_consumption.csv')

print("Columns in the dataset:", df.columns)
print("First few 'datetime' values:", df['datetime'].head())

if 'datetime' in df.columns:
    df['datetime'] = pd.to_datetime(df['datetime'], errors='coerce')  
else:
    print("Error: 'datetime' column not found in the dataset")
    exit()

print(f"Before dropping NaT: {df.shape[0]} rows")
df = df.dropna(subset=['datetime'])
print(f"After dropping NaT: {df.shape[0]} rows")

if df.shape[0] == 0:
    print("Error: No valid data left after dropping invalid 'datetime' values")
    exit()

df['Year'] = df['datetime'].dt.year

if 'Global_active_power' not in df.columns:
    print("Error: 'Global_active_power' column not found in the dataset")
    exit()

X = df[['Year']] 
y = df['Global_active_power']  

X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

model = LinearRegression()
model.fit(X_train, y_train)

output_folder = '../backend'
if not os.path.exists(output_folder):
    os.makedirs(output_folder)

model_path = os.path.join(output_folder, 'Household_power_consumption.pkl')
with open(model_path, 'wb') as f:
    pickle.dump(model, f)

print(f"Model training complete and saved as '{model_path}'")