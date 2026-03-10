import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import StoryChatSheet from "@/components/StoryChatSheet";

// Mock the Sheet primitives — render children directly for testability
vi.mock("@/components/ui/sheet", () => ({
  Sheet: ({ children, open }: any) => (open ? <div data-testid="sheet">{children}</div> : null),
  SheetContent: ({ children }: any) => <div data-testid="sheet-content">{children}</div>,
  SheetHeader: ({ children, ...props }: any) => <div {...props}>{children}</div>,
  SheetTitle: ({ children }: any) => <h2>{children}</h2>,
}));

vi.mock("@/components/ui/scroll-area", () => ({
  ScrollArea: ({ children, ...props }: any) => <div {...props}>{children}</div>,
}));

describe("StoryChatSheet", () => {
  const defaultProps = {
    open: true,
    onOpenChange: vi.fn(),
    initialPrompt: "",
  };

  it("renders when open", () => {
    render(<StoryChatSheet {...defaultProps} />);
    expect(screen.getByText("AI Story Assistant")).toBeInTheDocument();
  });

  it("does not render when closed", () => {
    render(<StoryChatSheet {...defaultProps} open={false} />);
    expect(screen.queryByText("AI Story Assistant")).not.toBeInTheDocument();
  });

  it("renders the input textarea", () => {
    render(<StoryChatSheet {...defaultProps} />);
    expect(
      screen.getByPlaceholderText(/Type a prompt/i)
    ).toBeInTheDocument();
  });

  it("renders Send and Clear buttons", () => {
    render(<StoryChatSheet {...defaultProps} />);
    expect(screen.getByText("Send")).toBeInTheDocument();
    expect(screen.getByText("Clear")).toBeInTheDocument();
  });

  it("shows placeholder when no messages", () => {
    render(<StoryChatSheet {...defaultProps} />);
    expect(
      screen.getByText(/Enter a prompt and I will help/i)
    ).toBeInTheDocument();
  });

  it("allows typing a message", () => {
    render(<StoryChatSheet {...defaultProps} />);
    const textarea = screen.getByPlaceholderText(/Type a prompt/i) as HTMLTextAreaElement;
    fireEvent.change(textarea, { target: { value: "Help me write a hook" } });
    expect(textarea.value).toBe("Help me write a hook");
  });

  it("sends a message and gets a local reply", async () => {
    render(<StoryChatSheet {...defaultProps} />);
    const textarea = screen.getByPlaceholderText(/Type a prompt/i);
    fireEvent.change(textarea, { target: { value: "Give me a hook idea" } });
    fireEvent.click(screen.getByText("Send"));

    await waitFor(() => {
      expect(screen.getByText("Give me a hook idea")).toBeInTheDocument();
    });

    // Should get a local reply since VITE_API_URL is not set
    await waitFor(() => {
      expect(screen.getByText(/Hook ideas|Quick ideas|Start mid/i)).toBeInTheDocument();
    });
  });

  it("clears chat history", async () => {
    render(<StoryChatSheet {...defaultProps} />);
    const textarea = screen.getByPlaceholderText(/Type a prompt/i);

    // Send a message first
    fireEvent.change(textarea, { target: { value: "Hello" } });
    fireEvent.click(screen.getByText("Send"));

    await waitFor(() => {
      expect(screen.getByText("Hello")).toBeInTheDocument();
    });

    // Clear should be enabled now
    await waitFor(() => {
      const clearBtn = screen.getByText("Clear");
      expect(clearBtn).not.toBeDisabled();
      fireEvent.click(clearBtn);
    });

    // Should show empty state again
    await waitFor(() => {
      expect(screen.getByText(/Enter a prompt and I will help/i)).toBeInTheDocument();
    });
  });

  it("preloads initialPrompt when opening", () => {
    render(<StoryChatSheet {...defaultProps} initialPrompt="Write me a cliffhanger" />);
    const textarea = screen.getByPlaceholderText(/Type a prompt/i) as HTMLTextAreaElement;
    expect(textarea.value).toBe("Write me a cliffhanger");
  });
});
