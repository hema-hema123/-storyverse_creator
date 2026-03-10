import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import { Loader2, ThumbsUp, ThumbsDown, BarChart3, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

interface SentimentResult {
  sentiment: "positive" | "negative";
  confidence: number;
  positive_words: string[];
  negative_words: string[];
}

interface SentimentStats {
  totalReviews: number;
  positive: number;
  negative: number;
  positivePercent: number;
  avgConfidence: number;
  recentReviews: (SentimentResult & { text: string })[];
}

const SENTIMENT_API = import.meta.env.VITE_SENTIMENT_API_URL || "http://localhost:5001";

// ─── Fallback local classifier (mirrors backend logic) ───────────
const POSITIVE = new Set([
  "love","great","amazing","fantastic","wonderful","excellent","perfect",
  "best","masterpiece","beautiful","stunning","gripping","recommend",
  "enjoyed","brilliant","superb","incredible","fun","emotional",
  "heartwarming","impressive","captivating","engaging",
]);
const NEGATIVE = new Set([
  "terrible","bad","worst","boring","waste","awful","horrible","poor",
  "disappointing","ruined","garbage","hate","lazy","unlikable","slow",
  "confusing","predictable","mediocre","dull","overrated","forgettable",
]);

function localClassify(text: string): SentimentResult {
  const words = new Set(text.toLowerCase().match(/[a-z]+/g) || []);
  const pos = [...words].filter((w) => POSITIVE.has(w));
  const neg = [...words].filter((w) => NEGATIVE.has(w));
  const total = pos.length + neg.length || 1;
  const score = (pos.length - neg.length) / total;
  return {
    sentiment: score >= 0 ? "positive" : "negative",
    confidence: Math.min(Math.abs(score) * 0.5 + 0.5, 0.99),
    positive_words: pos.sort(),
    negative_words: neg.sort(),
  };
}

// ─── Mock stats used when API is unreachable ──────────────────────
const MOCK_STATS: SentimentStats = {
  totalReviews: 48,
  positive: 31,
  negative: 17,
  positivePercent: 64.6,
  avgConfidence: 0.74,
  recentReviews: [
    { text: "I absolutely loved this movie, the ending was fantastic!", sentiment: "positive", confidence: 0.92, positive_words: ["loved", "fantastic"], negative_words: [] },
    { text: "Terrible writing and bad acting.", sentiment: "negative", confidence: 0.85, positive_words: [], negative_words: ["terrible", "bad"] },
    { text: "A masterpiece of modern cinema.", sentiment: "positive", confidence: 0.88, positive_words: ["masterpiece"], negative_words: [] },
    { text: "The plot made no sense whatsoever.", sentiment: "negative", confidence: 0.72, positive_words: [], negative_words: [] },
    { text: "Great acting and a wonderful script.", sentiment: "positive", confidence: 0.91, positive_words: ["great", "wonderful"], negative_words: [] },
    { text: "Do not watch this, it is garbage.", sentiment: "negative", confidence: 0.85, positive_words: [], negative_words: ["garbage"] },
    { text: "Highly recommend this to everyone.", sentiment: "positive", confidence: 0.82, positive_words: ["recommend"], negative_words: [] },
    { text: "I fell asleep halfway through, so boring.", sentiment: "negative", confidence: 0.78, positive_words: [], negative_words: ["boring"] },
  ],
};

export default function SentimentDashboard() {
  const [stats, setStats] = useState<SentimentStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [reviewText, setReviewText] = useState("");
  const [result, setResult] = useState<SentimentResult | null>(null);
  const [analyzing, setAnalyzing] = useState(false);

  // Load aggregate stats
  useEffect(() => {
    (async () => {
      try {
        const res = await fetch(`${SENTIMENT_API}/api/stats`);
        if (!res.ok) throw new Error("API down");
        setStats(await res.json());
      } catch {
        setStats(MOCK_STATS);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  async function analyzeReview() {
    const text = reviewText.trim();
    if (!text) return;
    setAnalyzing(true);
    try {
      const res = await fetch(`${SENTIMENT_API}/api/analyze`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text }),
      });
      if (!res.ok) throw new Error("API error");
      setResult(await res.json());
    } catch {
      setResult(localClassify(text));
    } finally {
      setAnalyzing(false);
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  const s = stats!;

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="max-w-6xl mx-auto px-4 md:px-12 py-10">
        <div className="flex items-center gap-3 mb-8">
          <BarChart3 className="w-7 h-7 text-primary" />
          <h1 className="text-2xl md:text-3xl font-semibold">Audience Sentiment Dashboard</h1>
        </div>

        {/* ─── KPI Cards ──────────────────────────── */}
        <div className="grid gap-4 grid-cols-2 md:grid-cols-4 mb-10">
          <div className="rounded-2xl border border-border bg-card p-5">
            <p className="text-xs uppercase tracking-widest text-muted-foreground">Total Reviews</p>
            <p className="text-3xl font-bold mt-2">{s.totalReviews}</p>
          </div>
          <div className="rounded-2xl border border-border bg-card p-5">
            <p className="text-xs uppercase tracking-widest text-muted-foreground">Positive</p>
            <p className="text-3xl font-bold mt-2 text-green-500">{s.positivePercent}%</p>
          </div>
          <div className="rounded-2xl border border-border bg-card p-5">
            <p className="text-xs uppercase tracking-widest text-muted-foreground">Negative</p>
            <p className="text-3xl font-bold mt-2 text-red-400">{(100 - s.positivePercent).toFixed(1)}%</p>
          </div>
          <div className="rounded-2xl border border-border bg-card p-5">
            <p className="text-xs uppercase tracking-widest text-muted-foreground">Avg Confidence</p>
            <p className="text-3xl font-bold mt-2">{(s.avgConfidence * 100).toFixed(0)}%</p>
          </div>
        </div>

        {/* ─── Sentiment Bar ──────────────────────── */}
        <div className="rounded-2xl border border-border bg-card p-6 mb-10">
          <p className="text-sm font-semibold mb-3">Sentiment Distribution</p>
          <div className="flex h-6 rounded-full overflow-hidden">
            <div
              className="bg-green-500 transition-all duration-700"
              style={{ width: `${s.positivePercent}%` }}
            />
            <div
              className="bg-red-400 transition-all duration-700"
              style={{ width: `${100 - s.positivePercent}%` }}
            />
          </div>
          <div className="flex justify-between text-xs text-muted-foreground mt-2">
            <span className="flex items-center gap-1"><ThumbsUp className="w-3 h-3" /> {s.positive} positive</span>
            <span className="flex items-center gap-1"><ThumbsDown className="w-3 h-3" /> {s.negative} negative</span>
          </div>
        </div>

        {/* ─── Live Analyzer ──────────────────────── */}
        <div className="rounded-2xl border border-border bg-card p-6 mb-10">
          <p className="text-sm font-semibold mb-3">Analyze a Review</p>
          <div className="flex flex-col sm:flex-row gap-3">
            <Textarea
              placeholder="Paste any review text here…"
              value={reviewText}
              onChange={(e) => setReviewText(e.target.value)}
              className="min-h-[80px] flex-1"
            />
            <Button onClick={analyzeReview} disabled={analyzing || !reviewText.trim()} className="self-end gap-2">
              <Send className="w-4 h-4" />
              {analyzing ? "Analyzing…" : "Analyze"}
            </Button>
          </div>

          {result && (
            <div className={`mt-4 rounded-xl p-4 border ${result.sentiment === "positive" ? "bg-green-500/10 border-green-500/30" : "bg-red-400/10 border-red-400/30"}`}>
              <div className="flex items-center gap-2 text-sm font-semibold">
                {result.sentiment === "positive" ? (
                  <ThumbsUp className="w-5 h-5 text-green-500" />
                ) : (
                  <ThumbsDown className="w-5 h-5 text-red-400" />
                )}
                <span className="capitalize">{result.sentiment}</span>
                <span className="text-muted-foreground font-normal ml-auto">
                  Confidence: {(result.confidence * 100).toFixed(0)}%
                </span>
              </div>
              {result.positive_words.length > 0 && (
                <p className="text-xs text-green-500 mt-2">
                  Positive signals: {result.positive_words.join(", ")}
                </p>
              )}
              {result.negative_words.length > 0 && (
                <p className="text-xs text-red-400 mt-2">
                  Negative signals: {result.negative_words.join(", ")}
                </p>
              )}
            </div>
          )}
        </div>

        {/* ─── Recent Reviews Table ───────────────── */}
        <div className="rounded-2xl border border-border bg-card p-6">
          <p className="text-sm font-semibold mb-4">Recent Reviews</p>
          <div className="space-y-3">
            {s.recentReviews.map((review, idx) => (
              <div key={idx} className="flex items-start gap-3 rounded-xl border border-border p-3">
                {review.sentiment === "positive" ? (
                  <ThumbsUp className="w-4 h-4 mt-1 text-green-500 flex-shrink-0" />
                ) : (
                  <ThumbsDown className="w-4 h-4 mt-1 text-red-400 flex-shrink-0" />
                )}
                <div className="flex-1 min-w-0">
                  <p className="text-sm line-clamp-2">{review.text}</p>
                  <p className="text-xs text-muted-foreground mt-1">
                    Confidence: {(review.confidence * 100).toFixed(0)}%
                    {review.positive_words.length > 0 && ` · +${review.positive_words.join(", ")}`}
                    {review.negative_words.length > 0 && ` · -${review.negative_words.join(", ")}`}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
