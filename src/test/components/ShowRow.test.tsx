import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import ShowRow from "@/components/ShowRow";
import type { Show } from "@/data/mockData";

const mockShows: Show[] = Array.from({ length: 5 }, (_, i) => ({
  id: `show-${i + 1}`,
  title: `Show ${i + 1}`,
  description: `Description ${i + 1}`,
  image: `/img-${i + 1}.jpg`,
  genre: "Sci-Fi",
  views: 1000 * (i + 1),
  episodes: [
    {
      id: `ep-${i}-1`,
      title: `Ep 1`,
      number: 1,
      description: "Test",
      plot: "Test",
      characters: [],
      additionalElements: "",
      isFinished: false,
    },
  ],
}));

function renderShowRow(title = "Trending Now", shows = mockShows) {
  return render(
    <MemoryRouter>
      <ShowRow title={title} shows={shows} />
    </MemoryRouter>
  );
}

describe("ShowRow", () => {
  it("renders the section title", () => {
    renderShowRow("My Test Row");
    expect(screen.getByText("My Test Row")).toBeInTheDocument();
  });

  it('shows "View all" button by default', () => {
    renderShowRow();
    expect(screen.getByText("View all")).toBeInTheDocument();
  });

  it('toggles to "Collapse" when "View all" is clicked', () => {
    renderShowRow();
    const btn = screen.getByText("View all");
    fireEvent.click(btn);
    expect(screen.getByText("Collapse")).toBeInTheDocument();
    expect(screen.queryByText("View all")).not.toBeInTheDocument();
  });

  it('toggles back to "View all" when "Collapse" is clicked', () => {
    renderShowRow();
    const viewAll = screen.getByText("View all");
    fireEvent.click(viewAll);
    const collapse = screen.getByText("Collapse");
    fireEvent.click(collapse);
    expect(screen.getByText("View all")).toBeInTheDocument();
  });

  it("renders all show cards", () => {
    renderShowRow();
    mockShows.forEach((show) => {
      expect(screen.getAllByText(show.title).length).toBeGreaterThanOrEqual(1);
    });
  });

  it("renders shows in scrollable container by default (not grid)", () => {
    const { container } = renderShowRow();
    // In collapsed state, there should be no grid layout
    const grids = container.querySelectorAll(".grid");
    expect(grids.length).toBe(0);
  });

  it("renders shows in grid layout when expanded", () => {
    const { container } = renderShowRow();
    fireEvent.click(screen.getByText("View all"));
    const grids = container.querySelectorAll(".grid");
    expect(grids.length).toBeGreaterThan(0);
  });

  it("handles empty shows array", () => {
    renderShowRow("Empty Row", []);
    expect(screen.getByText("Empty Row")).toBeInTheDocument();
    expect(screen.getByText("View all")).toBeInTheDocument();
  });
});
