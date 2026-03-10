import { useMemo, useState } from "react";
import type { Show } from "@/data/mockData";

/**
 * Client-side search + pagination hook.
 *
 * - Filters shows by title, genre, or description (case-insensitive).
 * - Pages results with a configurable page size.
 * - Returns `{ filtered, paged, page, totalPages, setPage, query, setQuery }`.
 */
export function useShowSearch(shows: Show[], pageSize = 12) {
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);

  const filtered = useMemo(() => {
    if (!query.trim()) return shows;
    const lower = query.toLowerCase();
    return shows.filter(
      (s) =>
        s.title.toLowerCase().includes(lower) ||
        s.genre.toLowerCase().includes(lower) ||
        s.description.toLowerCase().includes(lower)
    );
  }, [shows, query]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const safePage = Math.min(page, totalPages);

  const paged = useMemo(
    () => filtered.slice((safePage - 1) * pageSize, safePage * pageSize),
    [filtered, safePage, pageSize]
  );

  // Reset to page 1 when query changes
  const handleSetQuery = (q: string) => {
    setQuery(q);
    setPage(1);
  };

  return {
    query,
    setQuery: handleSetQuery,
    filtered,
    paged,
    page: safePage,
    totalPages,
    setPage,
  };
}
