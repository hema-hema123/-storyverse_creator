import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";

// Mock firebase auth before importing Login
vi.mock("@/lib/firebase", () => ({
  auth: { currentUser: null },
}));

vi.mock("firebase/auth", () => ({
  signInWithEmailAndPassword: vi.fn(),
  onAuthStateChanged: vi.fn((_, cb) => {
    cb(null);
    return () => {};
  }),
}));

import Login from "@/pages/Login";
import { signInWithEmailAndPassword } from "firebase/auth";

const mockedSignIn = vi.mocked(signInWithEmailAndPassword);

function renderLogin() {
  return render(
    <MemoryRouter initialEntries={["/login"]}>
      <Login />
    </MemoryRouter>
  );
}

describe("Login Page", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders the login form", () => {
    renderLogin();
    expect(screen.getByPlaceholderText("Email")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Password")).toBeInTheDocument();
    expect(screen.getByText("Sign In")).toBeInTheDocument();
  });

  it("renders the sign up link", () => {
    renderLogin();
    expect(screen.getByText("Sign up")).toBeInTheDocument();
  });

  it("updates email and password fields", () => {
    renderLogin();
    const emailInput = screen.getByPlaceholderText("Email") as HTMLInputElement;
    const passwordInput = screen.getByPlaceholderText("Password") as HTMLInputElement;

    fireEvent.change(emailInput, { target: { value: "test@test.com" } });
    fireEvent.change(passwordInput, { target: { value: "pass123" } });

    expect(emailInput.value).toBe("test@test.com");
    expect(passwordInput.value).toBe("pass123");
  });

  it("calls signInWithEmailAndPassword on form submit", async () => {
    mockedSignIn.mockResolvedValueOnce({} as any);
    renderLogin();

    fireEvent.change(screen.getByPlaceholderText("Email"), {
      target: { value: "user@example.com" },
    });
    fireEvent.change(screen.getByPlaceholderText("Password"), {
      target: { value: "secret" },
    });

    const form = screen.getByText("Sign In").closest("form")!;
    fireEvent.submit(form);

    await waitFor(() => {
      expect(mockedSignIn).toHaveBeenCalledOnce();
    });
  });

  it("shows error message on invalid credentials", async () => {
    mockedSignIn.mockRejectedValueOnce({ code: "auth/invalid-credential" });
    renderLogin();

    fireEvent.change(screen.getByPlaceholderText("Email"), {
      target: { value: "bad@test.com" },
    });
    fireEvent.change(screen.getByPlaceholderText("Password"), {
      target: { value: "wrong" },
    });

    const form = screen.getByText("Sign In").closest("form")!;
    fireEvent.submit(form);

    await waitFor(() => {
      expect(screen.getByText("Incorrect email or password.")).toBeInTheDocument();
    });
  });

  it("shows generic error on unknown failure", async () => {
    mockedSignIn.mockRejectedValueOnce({ code: "auth/unknown-error" });
    renderLogin();

    fireEvent.change(screen.getByPlaceholderText("Email"), {
      target: { value: "test@test.com" },
    });
    fireEvent.change(screen.getByPlaceholderText("Password"), {
      target: { value: "test" },
    });

    const form = screen.getByText("Sign In").closest("form")!;
    fireEvent.submit(form);

    await waitFor(() => {
      expect(screen.getByText("Login failed. Try again.")).toBeInTheDocument();
    });
  });

  it("disables button while loading", async () => {
    // Make signIn hang
    mockedSignIn.mockImplementation(() => new Promise(() => {}));
    renderLogin();

    fireEvent.change(screen.getByPlaceholderText("Email"), {
      target: { value: "test@test.com" },
    });
    fireEvent.change(screen.getByPlaceholderText("Password"), {
      target: { value: "test" },
    });

    const form = screen.getByText("Sign In").closest("form")!;
    fireEvent.submit(form);

    await waitFor(() => {
      expect(screen.getByText("Signing in...")).toBeInTheDocument();
    });
  });
});
