import { describe, it, expect } from "vitest";
import type { Show, Episode } from "@/data/mockData";

// We test the mock data structures and validation logic
// without importing heavy asset files

describe("Show type structure", () => {
  const validShow: Show = {
    id: "s1",
    title: "Test Show",
    description: "A test description",
    image: "/test.jpg",
    genre: "Fantasy",
    views: 5000,
    episodes: [],
  };

  it("accepts a valid show object", () => {
    expect(validShow.id).toBe("s1");
    expect(validShow.title).toBe("Test Show");
    expect(validShow.genre).toBe("Fantasy");
    expect(validShow.episodes).toHaveLength(0);
  });

  it("accepts optional badge field", () => {
    const withBadge: Show = { ...validShow, badge: "Top 10" };
    expect(withBadge.badge).toBe("Top 10");
  });

  it("handles show with zero views", () => {
    const zeroViews: Show = { ...validShow, views: 0 };
    expect(zeroViews.views).toBe(0);
    expect(zeroViews.views.toLocaleString()).toBe("0");
  });
});

describe("Episode type structure", () => {
  const baseEpisode: Episode = {
    id: "ep-1",
    title: "Pilot",
    number: 1,
    description: "The beginning",
    plot: "A hero awakens",
    characters: ["Hero", "Mentor"],
    additionalElements: "Magic system",
    isFinished: false,
  };

  it("accepts a valid episode object", () => {
    expect(baseEpisode.id).toBe("ep-1");
    expect(baseEpisode.characters).toContain("Hero");
    expect(baseEpisode.isFinished).toBe(false);
  });

  it("accepts optional branching choices", () => {
    const branching: Episode = {
      ...baseEpisode,
      choiceA: { label: "Go left", nextEpisodeId: "ep-2a" },
      choiceB: { label: "Go right", nextEpisodeId: "ep-2b" },
    };
    expect(branching.choiceA?.label).toBe("Go left");
    expect(branching.choiceB?.nextEpisodeId).toBe("ep-2b");
  });

  it("handles episode with no characters", () => {
    const empty: Episode = { ...baseEpisode, characters: [] };
    expect(empty.characters).toHaveLength(0);
  });
});

describe("Data integrity", () => {
  it("views count formats correctly with toLocaleString", () => {
    expect((189700).toLocaleString()).toBe("189,700");
    expect((0).toLocaleString()).toBe("0");
    expect((1000000).toLocaleString()).toBe("1,000,000");
  });

  it("genre filtering works correctly", () => {
    const shows: Pick<Show, "id" | "genre">[] = [
      { id: "1", genre: "Fantasy" },
      { id: "2", genre: "Sci-Fi" },
      { id: "3", genre: "Fantasy" },
      { id: "4", genre: "Romance" },
    ];
    const fantasy = shows.filter((s) => s.genre === "Fantasy");
    expect(fantasy).toHaveLength(2);
    expect(fantasy.every((s) => s.genre === "Fantasy")).toBe(true);
  });

  it("show sorting by views works correctly", () => {
    const shows: Pick<Show, "id" | "views">[] = [
      { id: "a", views: 100 },
      { id: "b", views: 500 },
      { id: "c", views: 200 },
    ];
    const sorted = [...shows].sort((a, b) => b.views - a.views);
    expect(sorted[0].id).toBe("b");
    expect(sorted[1].id).toBe("c");
    expect(sorted[2].id).toBe("a");
  });
});
