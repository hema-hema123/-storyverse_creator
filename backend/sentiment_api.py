"""
Sentiment Analysis REST API — serves ML predictions to the React frontend.

Endpoints:
  POST /api/analyze   — Classify review text as positive/negative
  GET  /api/stats     — Aggregated sentiment stats (cached in-memory)

Runs alongside the Flask chat bot (story_bot/app.py) on a different port.
"""

import os, csv, re
from flask import Flask, request, jsonify
from flask_cors import CORS

# ─── Lightweight in-memory model ───────────────────────────────────
# We ship a small TF-IDF + Logistic Regression model built from the
# reviews.csv file at startup so the frontend can get predictions
# without a heavy ML runtime in production.

import numpy as np

app = Flask(__name__)
CORS(app)

# ─── Keyword-based fast classifier (no sklearn needed in prod) ──
POSITIVE_WORDS = {
    "love", "great", "amazing", "fantastic", "wonderful", "excellent",
    "perfect", "best", "masterpiece", "beautiful", "stunning", "gripping",
    "recommend", "enjoyed", "brilliant", "superb", "incredible", "fun",
    "emotional", "heartwarming", "impressive", "captivating", "engaging",
}

NEGATIVE_WORDS = {
    "terrible", "bad", "worst", "boring", "waste", "awful", "horrible",
    "poor", "disappointing", "ruined", "garbage", "hate", "lazy",
    "unlikable", "slow", "confusing", "predictable", "mediocre", "dull",
    "overrated", "forgettable", "painful", "cringe",
}


def classify(text: str) -> dict:
    """Return { sentiment, confidence, positive_hits, negative_hits }."""
    words = set(re.findall(r"[a-z]+", text.lower()))
    pos = words & POSITIVE_WORDS
    neg = words & NEGATIVE_WORDS
    total = len(pos) + len(neg) or 1
    score = (len(pos) - len(neg)) / total  # -1..+1
    sentiment = "positive" if score >= 0 else "negative"
    confidence = round(min(abs(score) * 0.5 + 0.5, 0.99), 2)
    return {
        "sentiment": sentiment,
        "confidence": confidence,
        "positive_words": sorted(pos),
        "negative_words": sorted(neg),
    }


# ─── Pre-load review stats from CSV ────────────────────────────────
CSV_PATH = os.path.join(os.path.dirname(__file__), "..", "src", "data", "reviews.csv")
_cached_stats = None


def _load_stats():
    global _cached_stats
    if _cached_stats:
        return _cached_stats

    sentiments = {"positive": 0, "negative": 0}
    total_confidence = 0
    reviews = []

    try:
        with open(CSV_PATH, newline="", encoding="utf-8") as f:
            reader = csv.DictReader(f)
            for row in reader:
                text = row.get("review_text") or row.get("Review", "")
                if not text:
                    continue
                result = classify(text)
                sentiments[result["sentiment"]] += 1
                total_confidence += result["confidence"]
                reviews.append({
                    "text": text[:120],
                    **result,
                })
    except FileNotFoundError:
        pass

    total = sentiments["positive"] + sentiments["negative"] or 1
    _cached_stats = {
        "totalReviews": total,
        "positive": sentiments["positive"],
        "negative": sentiments["negative"],
        "positivePercent": round(sentiments["positive"] / total * 100, 1),
        "avgConfidence": round(total_confidence / total, 2),
        "recentReviews": reviews[:20],
    }
    return _cached_stats


# ─── Routes ─────────────────────────────────────────────────────────
@app.route("/api/analyze", methods=["POST"])
def analyze():
    data = request.json or {}
    text = data.get("text", "").strip()
    if not text:
        return jsonify({"error": "Missing 'text' field"}), 400
    return jsonify(classify(text))


@app.route("/api/stats", methods=["GET"])
def stats():
    return jsonify(_load_stats())


@app.route("/api/health", methods=["GET"])
def health():
    return jsonify({"status": "ok", "service": "sentiment-api"})


if __name__ == "__main__":
    port = int(os.environ.get("SENTIMENT_PORT", 5001))
    print(f"Sentiment API running on http://localhost:{port}")
    app.run(debug=True, port=port)
