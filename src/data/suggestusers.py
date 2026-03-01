import json
import csv

CSV_PATH = "user_reviews.csv"
CURRENT_USER_JSON_PATH = "placeholdername.json"


def load_current_user_id():
    """
    Read current user ID from JSON file.
    """
    with open(CURRENT_USER_JSON_PATH, "r") as f:
        data = json.load(f)
    return int(data["User_ID"])


def load_users():
    """
    Load all users from CSV into a list of dictionaries.
    """
    users = []
    with open(CSV_PATH, newline="", encoding="utf-8") as f:
        reader = csv.DictReader(f)
        for row in reader:
            row["User_ID"] = int(row["User_ID"])
            row["Rating"] = int(row["Rating"])
            row["Age"] = int(row["Age"]) if row["Age"] else None
            users.append(row)
    return users


def find_user(users, user_id):
    """
    Find a user in the CSV by User_ID.
    """
    for u in users:
        if u["User_ID"] == user_id:
            return u
    return None


def similarity_score(candidate, current):
    """
    Score similarity based on:
    - Same genre (high weight)
    - Close rating (low weight)
    """
    score = 0

    if candidate["Favorite_Genre"] == current["Favorite_Genre"]:
        score += 10

    score += max(0, 5 - abs(candidate["Rating"] - current["Rating"]))

    return score


def suggest_users(users, current_user, k=10):
    """
    Suggest users based on similarity score.
    """
    scored = []

    for u in users:
        if u["User_ID"] == current_user["User_ID"]:
            continue

        score = similarity_score(u, current_user)
        scored.append((score, u))

    scored.sort(key=lambda x: x[0], reverse=True)
    return [u for score, u in scored[:k]]


def main():
    """
    Main execution.
    """
    current_user_id = load_current_user_id()
    users = load_users()

    current_user = find_user(users, current_user_id)

    print("Current user:")
    print(
        f"User_ID={current_user['User_ID']} | "
        f"Genre={current_user['Favorite_Genre']} | "
        f"Rating={current_user['Rating']}"
    )

    recommendations = suggest_users(users, current_user)

    print("\nSuggested users:")
    for i, u in enumerate(recommendations, 1):
        print(
            f"{i}. User_ID={u['User_ID']} | "
            f"Genre={u['Favorite_Genre']} | "
            f"Rating={u['Rating']}"
        )


if __name__ == "__main__":
    main()
def main():
    # 1) Get the current user id from JSON (this stands in for “who is logged in”)
    current_user_id = load_current_user_id()

    # 2) Load all users from the CSV
    users = load_users()

    # 3) Find the current user's full row in the CSV (so we can read their genre/rating)
    current_user = find_user(users, current_user_id)

    # 4) Suggest similar users (based on genre + rating similarity)
    recommendations = suggest_users(users, current_user, k=10)

    # 5) Print results (current user first, then the suggested users)
    print("Current user (from JSON -> matched in CSV):")
    print(
        f"User_ID={current_user['User_ID']} | "
        f"Age={current_user.get('Age')} | "
        f"Gender={current_user.get('Gender')} | "
        f"Genre={current_user.get('Favorite_Genre')} | "
        f"Ending={current_user.get('Preferred_Ending')} | "
        f"Rating={current_user.get('Rating')}"
    )

    print("\nSuggested users:")
    for i, u in enumerate(recommendations, 1):
        print(
            f"{i}. User_ID={u['User_ID']} | "
            f"Age={u.get('Age')} | "
            f"Gender={u.get('Gender')} | "
            f"Genre={u.get('Favorite_Genre')} | "
            f"Ending={u.get('Preferred_Ending')} | "
            f"Rating={u.get('Rating')}"
        )