import { describe, it, expect } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { useShowSearch } from "@/hooks/useShowSearch";
import type { Show } from "@/data/mockData";

const makeShow = (id: string, title: string, genre: string, desc = ""): Show => ({
  id,
  title,
  description: desc,
  image: "/test.jpg",
  genre,
  views: 100,
  episodes: [],
});

const mockShows: Show[] = [
  makeShow("1", "Shadow Kingdom", "Fantasy", "Dark fantasy adventure"),
  makeShow("2", "Neon Drift", "Sci-Fi", "Cyberpunk racing story"),
  makeShow("3", "Heart Strings", "Romance", "Love in Paris"),
  makeShow("4", "Cold Case Files", "Mystery", "Detective investigates"),
  makeShow("5", "Dark Forest", "Fantasy", "Elven warriors"),
  makeShow("6", "Star Bound", "Sci-Fi", "Space exploration"),
  makeShow("7", "Summer Love", "Romance", "Beach romance"),
  makeShow("8", "Whodunit", "Mystery", "Murder mystery"),
  makeShow("9", "Dragon Fire", "Fantasy", "Fire-breathing dragons"),
  makeShow("10", "Alien Dawn", "Sci-Fi", "First contact story"),
  makeShow("11", "True Love", "Romance", "Soulmates meet"),
  makeShow("12", "The Heist", "Crime", "Bank robbery gone wrong"),
  makeShow("13", "Moonrise", "Fantasy", "Werewolf saga"),
  makeShow("14", "Quantum Leap", "Sci-Fi", "Time travel paradox"),
  makeShow("15", "Last Dance", "Romance", "Ballroom competition"),
];

describe("useShowSearch", () => {
  it("returns all shows when query is empty", () => {
    const { result } = renderHook(() => useShowSearch(mockShows, 5));
    expect(result.current.filtered).toHaveLength(15);
    expect(result.current.paged).toHaveLength(5);
    expect(result.current.totalPages).toBe(3);
    expect(result.current.page).toBe(1);
  });

  it("filters by title", () => {
    const { result } = renderHook(() => useShowSearch(mockShows, 10));
    act(() => result.current.setQuery("Shadow"));
    expect(result.current.filtered).toHaveLength(1);
    expect(result.current.filtered[0].title).toBe("Shadow Kingdom");
  });

  it("filters by genre (case-insensitive)", () => {
    const { result } = renderHook(() => useShowSearch(mockShows, 10));
    act(() => result.current.setQuery("fantasy"));
    // 3 with genre="Fantasy" + 1 with "fantasy" in description = 4
    expect(result.current.filtered.length).toBe(4);
    expect(result.current.filtered.every(
      (s) => s.genre === "Fantasy" || s.description.toLowerCase().includes("fantasy")
    )).toBe(true);
  });

  it("filters by description", () => {
    const { result } = renderHook(() => useShowSearch(mockShows, 10));
    act(() => result.current.setQuery("cyberpunk"));
    expect(result.current.filtered).toHaveLength(1);
    expect(result.current.filtered[0].id).toBe("2");
  });

  it("paginates correctly", () => {
    const { result } = renderHook(() => useShowSearch(mockShows, 5));
    expect(result.current.paged).toHaveLength(5);
    expect(result.current.paged[0].id).toBe("1");

    act(() => result.current.setPage(2));
    expect(result.current.paged[0].id).toBe("6");
    expect(result.current.paged).toHaveLength(5);

    act(() => result.current.setPage(3));
    expect(result.current.paged).toHaveLength(5);
    expect(result.current.paged[0].id).toBe("11");
  });

  it("resets to page 1 when query changes", () => {
    const { result } = renderHook(() => useShowSearch(mockShows, 5));
    act(() => result.current.setPage(3));
    expect(result.current.page).toBe(3);

    act(() => result.current.setQuery("sci"));
    expect(result.current.page).toBe(1);
  });

  it("returns empty results for non-matching query", () => {
    const { result } = renderHook(() => useShowSearch(mockShows, 10));
    act(() => result.current.setQuery("xyznonexistent"));
    expect(result.current.filtered).toHaveLength(0);
    expect(result.current.paged).toHaveLength(0);
    expect(result.current.totalPages).toBe(1);
  });

  it("handles empty shows array", () => {
    const { result } = renderHook(() => useShowSearch([], 5));
    expect(result.current.filtered).toHaveLength(0);
    expect(result.current.totalPages).toBe(1);
  });

  it("clamps page when out of range", () => {
    const { result } = renderHook(() => useShowSearch(mockShows, 5));
    act(() => result.current.setPage(999));
    expect(result.current.page).toBe(3); // max 3 pages with 15 items, page size 5
  });
});
