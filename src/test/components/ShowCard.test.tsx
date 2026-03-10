import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import ShowCard from "@/components/ShowCard";
import type { Show } from "@/data/mockData";

const mockShow: Show = {
  id: "test-show-1",
  title: "The Last Kingdom",
  description: "An epic tale of kingdoms and warriors",
  image: "/test-image.jpg",
  genre: "Fantasy",
  views: 15000,
  badge: "New",
  episodes: [
    {
      id: "ep-1",
      title: "Episode 1",
      number: 1,
      description: "The beginning",
      plot: "A hero rises",
      characters: ["Hero", "Villain"],
      additionalElements: "",
      isFinished: false,
    },
    {
      id: "ep-2",
      title: "Episode 2",
      number: 2,
      description: "The journey",
      plot: "Adventure unfolds",
      characters: ["Hero"],
      additionalElements: "",
      isFinished: true,
    },
  ],
};

function renderShowCard(show = mockShow) {
  return render(
    <MemoryRouter>
      <ShowCard show={show} />
    </MemoryRouter>
  );
}

describe("ShowCard", () => {
  it("renders show title", () => {
    renderShowCard();
    // Title appears twice: once in the hover overlay, once in the card body
    const titles = screen.getAllByText("The Last Kingdom");
    expect(titles.length).toBeGreaterThanOrEqual(1);
  });

  it("renders genre label", () => {
    renderShowCard();
    expect(screen.getByText("Fantasy")).toBeInTheDocument();
  });

  it("renders episode count and view count", () => {
    renderShowCard();
    expect(screen.getByText("2 episodes · 15,000 views")).toBeInTheDocument();
  });

  it("renders badge when present", () => {
    renderShowCard();
    expect(screen.getByText("New")).toBeInTheDocument();
  });

  it("does not render badge when absent", () => {
    const noBadgeShow = { ...mockShow, badge: undefined };
    renderShowCard(noBadgeShow);
    expect(screen.queryByText("New")).not.toBeInTheDocument();
  });

  it("links to the correct show detail page", () => {
    renderShowCard();
    const link = screen.getByRole("link");
    expect(link).toHaveAttribute("href", "/show/test-show-1");
  });

  it("renders the show image with correct alt text", () => {
    renderShowCard();
    const img = screen.getByAltText("The Last Kingdom");
    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute("src", "/test-image.jpg");
  });

  it("displays 0 views correctly", () => {
    const zeroViewsShow = { ...mockShow, views: 0, episodes: [] };
    renderShowCard(zeroViewsShow);
    expect(screen.getByText("0 episodes · 0 views")).toBeInTheDocument();
  });
});
