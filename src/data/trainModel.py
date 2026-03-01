import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
from sklearn.preprocessing import LabelEncoder
from sklearn.metrics import accuracy_score, classification_report
import os

current_script_folder = os.path.dirname(os.path.abspath(__file__))

# 2. Tell Python the CSV is right here in this folder
csv_file_path = os.path.join(current_script_folder, 'user_reviews.csv')
# --- PATH SETUP END ---

# 3. Verify it exists before crashing
if not os.path.exists(csv_file_path):
    print(f"❌ Error: Could not find file at: {csv_file_path}")
    print("Make sure 'user_reviews.csv' is in the same folder as this script!")
else:
    print(f"✅ Found data at: {csv_file_path}")
    
    # 4. Load the data using the absolute path
    df = pd.read_csv(csv_file_path)

def train_sentiment_model():
    # 1. Load the Data
    try:
        df = pd.read_csv(csv_file_path)
    except FileNotFoundError:
        print("Error: 'user_reviews.csv' not found. Run generate_data.py first.")
        return

    # 2. Preprocessing
    # Machine learning models require numbers, not strings.
    # We convert categories (Male, Sci-Fi, Ending A) into numbers.
    
    le_gender = LabelEncoder()
    df['Gender'] = le_gender.fit_transform(df['Gender'])
    
    le_genre = LabelEncoder()
    df['Favorite_Genre'] = le_genre.fit_transform(df['Favorite_Genre'])
    
    le_ending = LabelEncoder()
    df['Preferred_Ending'] = le_ending.fit_transform(df['Preferred_Ending'])

    # 3. Separate Features (X) and Target (y)
    # We want to predict 'Rating' based on the other columns.
    X = df.drop('Rating', axis=1)
    y = df['Rating']

    # 4. Split into Training and Testing sets
    # 80% of data creates the brain, 20% tests if it works.
    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

    # 5. Initialize and Train the Model
    # n_estimators=100 means we create 100 decision trees and average them.
    model = RandomForestClassifier(n_estimators=100, random_state=42)
    print("Training model...")
    model.fit(X_train, y_train)

    # 6. Make Predictions
    y_pred = model.predict(X_test)

    # 7. Evaluate
    accuracy = accuracy_score(y_test, y_pred)
    print(f"\nModel Accuracy: {accuracy * 100:.2f}%")
    print("\nClassification Report:\n")
    print(classification_report(y_test, y_pred))

    # Optional: Test a single new user
    # Example: 25 year old Male, likes Sci-Fi, prefers Ending A
    # Note: We must encode the inputs exactly like we did the training data
    new_user = pd.DataFrame([[55, 'Male', 'Sci-Fi', 'Ending A']], 
                            columns=['Age', 'Gender', 'Favorite_Genre', 'Preferred_Ending'])
    
    # Apply the same encoders
    new_user['Gender'] = le_gender.transform(new_user['Gender'])
    new_user['Favorite_Genre'] = le_genre.transform(new_user['Favorite_Genre'])
    new_user['Preferred_Ending'] = le_ending.transform(new_user['Preferred_Ending'])
    
    prediction = model.predict(new_user)
    print(f"Predicted Rating for new user (25, Male, Sci-Fi, Ending A): {prediction[0]}/5")

if __name__ == "__main__":
    train_sentiment_model()