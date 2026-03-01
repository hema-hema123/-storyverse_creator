import pandas as pd
import sys
import os


current_script_folder = os.path.dirname(os.path.abspath(__file__))

# 2. Tell Python the CSV is right here in this folder
csv_file_path = os.path.join(current_script_folder, 'shows.csv')
df = pd.read_csv(csv_file_path)

def analyze_genres(file_path):
    try:
        # Load the CSV file
        
        # specific cleanup: strip whitespace from column names to avoid key errors
        df.columns = df.columns.str.strip()
        
        # Check if required columns exist
        required_columns = ['genre', 'average rating']
        if not all(col in df.columns for col in required_columns):
            print(f"Error: CSV must contain the following columns: {required_columns}")
            return

        # --- ANALYSIS 1: Popularity by Average Rating ---
        # Group by genre and calculate the mean of 'average rating'
        genre_ratings = df.groupby('genre')['average rating'].mean().reset_index()
        # Sort by rating (highest first)
        top_rated = genre_ratings.sort_values(by='average rating', ascending=False)

        # --- ANALYSIS 2: Popularity by Frequency (Most produced) ---
        # Count how many shows exist per genre
        genre_counts = df['genre'].value_counts().reset_index()
        genre_counts.columns = ['genre', 'show_count']

        # --- DISPLAY RESULTS ---
        print("-" * 30)
        print("GENRES RANKED BY AVERAGE RATING")
        print("-" * 30)
        # Format the rating to 2 decimal places for cleaner output
        print(top_rated.to_string(index=False, formatters={'average rating': '{:.2f}'.format}))
        
        print("\n" + "-" * 30)
        print("GENRES RANKED BY VOLUME (Count)")
        print("-" * 30)
        print(genre_counts.to_string(index=False))
        return top_rated.iloc[0]['genre']

    except FileNotFoundError:
        print(f"Error: The file '{file_path}' was not found. Please make sure it is in the same directory.")
    except Exception as e:
        print(f"An unexpected error occurred: {e}")

if __name__ == "__main__":
    # You can change this filename if your CSV is named differently
    csv_filename = 'shows.csv'
    x = analyze_genres(csv_filename)
    print(f"\nThe most popular genre based on average rating is: {x}")