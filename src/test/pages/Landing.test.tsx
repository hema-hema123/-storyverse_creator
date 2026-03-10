import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Landing from "@/pages/Landing";

function renderLanding() {
  return render(
    <MemoryRouter>
      <Landing />
    </MemoryRouter>
  );
}

describe("Landing Page", () => {
  it("renders the main headline", () => {
    renderLanding();
    expect(screen.getByText(/Build your story world/i)).toBeInTheDocument();
  });

  it("renders the Get Started button", () => {
    renderLanding();
    expect(screen.getByText("Get Started")).toBeInTheDocument();
  });

  it("renders the Sign In button", () => {
    renderLanding();
    expect(screen.getByText("Sign In")).toBeInTheDocument();
  });

  it("renders all feature cards", () => {
    renderLanding();
    expect(screen.getByText("Season Board")).toBeInTheDocument();
    // AI Story Lab appears in both the pills and the feature card
    expect(screen.getAllByText("AI Story Lab").length).toBeGreaterThanOrEqual(2);
    expect(screen.getByText("Posting Intel")).toBeInTheDocument();
    // Creator Lounge also appears twice
    expect(screen.getAllByText("Creator Lounge").length).toBeGreaterThanOrEqual(2);
  });

  it("renders all FAQ questions", () => {
    renderLanding();
    expect(screen.getByText("Frequently Asked Questions")).toBeInTheDocument();
    expect(screen.getByText(/How is Storyverse different/i)).toBeInTheDocument();
    expect(screen.getByText(/What does the AI help with/i)).toBeInTheDocument();
    expect(screen.getByText(/Do I need a team/i)).toBeInTheDocument();
    expect(screen.getByText(/Can I track what/i)).toBeInTheDocument();
  });

  it("renders logo image", () => {
    renderLanding();
    const logo = screen.getByAltText("Storyverse Logo");
    expect(logo).toBeInTheDocument();
  });

  it("renders sub-features section", () => {
    renderLanding();
    expect(screen.getByText("Episode cadence")).toBeInTheDocument();
    expect(screen.getByText("Story arcs")).toBeInTheDocument();
    expect(screen.getByText("Audience signals")).toBeInTheDocument();
  });
});
