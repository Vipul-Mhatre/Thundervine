import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestRegressor
from sklearn.metrics import mean_squared_error, r2_score
from sklearn.preprocessing import OneHotEncoder
from sklearn.compose import ColumnTransformer
from sklearn.pipeline import Pipeline
import joblib

carbon_emission_path = '../data/Carbon Emission.csv'
carbon_emission_df = pd.read_csv(carbon_emission_path)

carbon_features = [
    'Body Type', 'Sex', 'Diet', 'How Often Shower', 'Heating Energy Source',
    'Transport', 'Vehicle Monthly Distance Km', 'Waste Bag Weekly Count',
    'How Long TV PC Daily Hour', 'How Many New Clothes Monthly',
    'How Long Internet Daily Hour', 'Energy efficiency'
]
target_column = 'CarbonEmission'

# input (X) and target (y)
X_carbon = carbon_emission_df[carbon_features]
y_carbon = carbon_emission_df[target_column]

categorical_features = X_carbon.select_dtypes(include=['object']).columns
numeric_features = X_carbon.select_dtypes(include=['int64', 'float64']).columns

preprocessor = ColumnTransformer(
    transformers=[
        ('num', 'passthrough', numeric_features),
        ('cat', OneHotEncoder(handle_unknown='ignore'), categorical_features)
    ])

carbon_model = Pipeline(steps=[
    ('preprocessor', preprocessor),
    ('regressor', RandomForestRegressor(n_estimators=100, random_state=42))
])

X_train, X_test, y_train, y_test = train_test_split(X_carbon, y_carbon, test_size=0.2, random_state=42)

carbon_model.fit(X_train, y_train)

y_pred = carbon_model.predict(X_test)
mse = mean_squared_error(y_test, y_pred)
r2 = r2_score(y_test, y_pred)
print(f"Model Evaluation: MSE={mse}, R²={r2}")

model_path = 'carbon_emission_model.pkl'
joblib.dump(carbon_model, model_path)