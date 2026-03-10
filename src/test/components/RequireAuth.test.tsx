import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";

// Must mock before importing RequireAuth
const mockOnAuthStateChanged = vi.fn();

vi.mock("@/lib/firebase", () => ({
  auth: {},
}));

vi.mock("firebase/auth", () => ({
  onAuthStateChanged: (...args: unknown[]) => mockOnAuthStateChanged(...args),
  signOut: vi.fn(),
}));

import RequireAuth from "@/components/RequireAuth";

function renderWithAuth(initialRoute = "/browse") {
  return render(
    <MemoryRouter initialEntries={[initialRoute]}>
      <Routes>
        <Route path="/login" element={<div>Login Page</div>} />
        <Route
          path="/browse"
          element={
            <RequireAuth>
              <div>Protected Content</div>
            </RequireAuth>
          }
        />
      </Routes>
    </MemoryRouter>
  );
}

describe("RequireAuth", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    localStorage.clear();
  });

  it("shows loading state initially", () => {
    // Don't call the callback right away
    mockOnAuthStateChanged.mockReturnValue(() => {});
    renderWithAuth();
    // Should not yet show protected content or login
    expect(screen.queryByText("Protected Content")).not.toBeInTheDocument();
  });

  it("redirects to login when user is not authenticated", async () => {
    mockOnAuthStateChanged.mockImplementation((_auth: unknown, callback: (u: null) => void) => {
      callback(null);
      return () => {};
    });

    renderWithAuth();

    await waitFor(() => {
      expect(screen.getByText("Login Page")).toBeInTheDocument();
    });
  });

  it("renders children when user is authenticated", async () => {
    mockOnAuthStateChanged.mockImplementation((_auth: unknown, callback: (u: object) => void) => {
      callback({ uid: "test-user-123", email: "test@test.com" });
      return () => {};
    });

    renderWithAuth();

    await waitFor(() => {
      expect(screen.getByText("Protected Content")).toBeInTheDocument();
    });
  });
});
