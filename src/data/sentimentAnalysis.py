import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.linear_model import LogisticRegression
from sklearn.metrics import classification_report, accuracy_score


# --- 1. DATA GENERATION (Creating a Mock Dataset) ---
def get_mock_reviews():
    """
    Creates a dataframe of fake reviews to train our model.
    In a real project, you would replace this with: df = pd.read_csv('reviews.csv')
    """
    # data = {
    #     'review_text': [
    #         # Positive examples
    #         "I absolutely loved this movie, the ending was fantastic!",
    #         "Great acting and a wonderful script.",
    #         "A masterpiece of modern cinema.",
    #         "Highly recommend this to everyone, it was perfect.",
    #         "The characters were so well written and deep.",
    #         "Best show I have seen in years.",
    #         "An emotional rollercoaster that pays off beautifully.",
    #         "Visuals were stunning and the story was gripping.",
            
            
    #         # Negative examples
    #         "This was a complete waste of time.",
    #         "Terrible writing and bad acting.",
    #         "I fell asleep halfway through, so boring.",
    #         "The plot made no sense whatsoever.",
    #         "Worst movie I have ever seen.",
    #         "Do not watch this, it is garbage.",
    #         "The ending ruined the entire show for me.",
    #         "Lazy writing and unlikable characters."
    #     ],
    #     'sentiment': [
    #         # 1 = Positive, 0 = Negative
    #         1, 1, 1, 1, 1, 1, 1, 1,
    #         0, 0, 0, 0, 0, 0, 0, 0
    #     ]
    # }
    # return pd.DataFrame(data)

def train_sentiment_model():
    # 1. Load Data
    print("Loading data...")
    df = pd.read_csv("reviews.csv")
    
    # 2. Split Data
    # X is the text, y is the label (0 or 1)
    X_train, X_test, y_train, y_test = train_test_split(
        df['review_text'], df['sentiment'], test_size=0.2, random_state=42
    )

    # 3. Vectorization (The Magic Step)
    # Computers can't read English. We use TF-IDF (Term Frequency-Inverse Document Frequency).
    # It counts how 'important' a word is. Rare words like "masterpiece" get higher scores 
    # than common words like "the".
    print("Vectorizing text...")
   # vectorizer = TfidfVectorizer(stop_words='english')
    vectorizer = TfidfVectorizer(lowercase=True, analyzer="char_wb", ngram_range=(3, 5), min_df=1)
    
    # We 'fit' the vectorizer on the training data so it learns the vocabulary
    X_train_vec = vectorizer.fit_transform(X_train)
    X_test_vec = vectorizer.transform(X_test)

    # 4. Train the Model
    # Logistic Regression is excellent for binary text classification
    print("Training model...")
    model = LogisticRegression()
    model.fit(X_train_vec, y_train)

    # 5. Evaluate
    predictions = model.predict(X_test_vec)
    print(f"\nModel Accuracy: {accuracy_score(y_test, predictions)*100:.2f}%")
    print("\nClassification Report:")
    print(classification_report(y_test, predictions, target_names=['Negative', 'Positive']))

    return model, vectorizer

# --- INTERACTIVE TESTING ---
if __name__ == "__main__":
    # Train the model
    model, vectorizer = train_sentiment_model()
    
    print("-" * 30)
    print("🤖 SENTIMENT ANALYZER READY")
    print("Type a review to test (or 'quit' to exit)")
    print("-" * 30)
    
    while True:
        user_input = input("\nEnter a review: ")
        if user_input.lower() == 'quit':
            break
            
        # Preprocess the user's input just like the training data
        input_vec = vectorizer.transform([user_input])
        
        # Predict
        prediction = model.predict(input_vec)[0]
        probability = model.predict_proba(input_vec)[0][prediction]
        
        sentiment = "POSITIVE" if prediction == 1 else "NEGATIVE"
        print(f"Prediction: {sentiment} (Confidence: {probability*100:.1f}%)")