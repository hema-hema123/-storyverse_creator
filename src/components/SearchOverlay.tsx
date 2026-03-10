import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search, X } from "lucide-react";
import type { Show } from "@/data/mockData";

interface SearchOverlayProps {
  shows: Show[];
  open: boolean;
  onClose: () => void;
}

export default function SearchOverlay({ shows, open, onClose }: SearchOverlayProps) {
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (open) {
      setQuery("");
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [open]);

  // Close on Escape
  useEffect(() => {
    if (!open) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [open, onClose]);

  if (!open) return null;

  const lower = query.toLowerCase();
  const results = query.trim()
    ? shows.filter(
        (s) =>
          s.title.toLowerCase().includes(lower) ||
          s.genre.toLowerCase().includes(lower) ||
          s.description.toLowerCase().includes(lower)
      ).slice(0, 8)
    : [];

  return (
    <div className="fixed inset-0 z-[100] bg-background/95 backdrop-blur-sm flex flex-col">
      {/* Header */}
      <div className="flex items-center gap-3 px-4 md:px-12 py-4 border-b border-border">
        <Search className="w-5 h-5 text-muted-foreground" />
        <input
          ref={inputRef}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search shows, genres, descriptions…"
          className="flex-1 bg-transparent text-lg outline-none placeholder:text-muted-foreground"
        />
        <button onClick={onClose} className="p-2 rounded-full hover:bg-accent transition-colors" aria-label="Close search">
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Results */}
      <div className="flex-1 overflow-y-auto px-4 md:px-12 py-6">
        {query.trim() && results.length === 0 && (
          <p className="text-muted-foreground text-center mt-10">
            No results for "{query}"
          </p>
        )}

        {results.length > 0 && (
          <div className="grid gap-3 max-w-3xl mx-auto">
            {results.map((show) => (
              <button
                key={show.id}
                onClick={() => {
                  navigate(`/show/${show.id}`);
                  onClose();
                }}
                className="flex items-center gap-4 rounded-2xl border border-border bg-card/80 p-4 text-left hover:border-primary/40 transition-colors"
              >
                <img
                  src={show.image}
                  alt={show.title}
                  className="w-16 h-10 rounded-lg object-cover flex-shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <p className="font-semibold line-clamp-1">{show.title}</p>
                  <p className="text-xs text-muted-foreground">
                    {show.genre} · {show.episodes.length} episodes · {show.views.toLocaleString()} views
                  </p>
                </div>
              </button>
            ))}
          </div>
        )}

        {!query.trim() && (
          <div className="text-center text-muted-foreground mt-10">
            <p className="text-lg">Start typing to search</p>
            <p className="text-sm mt-2">Search by title, genre, or description</p>
          </div>
        )}
      </div>
    </div>
  );
}
