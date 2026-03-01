import { useEffect, useRef, useState } from "react";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Textarea } from "@/components/ui/textarea";

type ChatTurn = { role: "user" | "assistant"; content: string };

type StoryChatSheetProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  initialPrompt?: string;
};

export default function StoryChatSheet({ open, onOpenChange, initialPrompt }: StoryChatSheetProps) {
  const [message, setMessage] = useState("");
  const [history, setHistory] = useState<ChatTurn[]>([]);
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!open) return;
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [history, open]);

  useEffect(() => {
    // When opening, optionally preload a prompt into the input
    if (open && initialPrompt) setMessage(initialPrompt);
  }, [open, initialPrompt]);

  function localReply(input: string) {
    const lower = input.toLowerCase();
    if (lower.includes("name") || lower.includes("protagonist") || lower.includes("character")) {
      return "Name ideas:\n- Avery Cross\n- Juno Vale\n- Kai Monroe\n- Lila Frost\n- Theo Ash";
    }
    if (lower.includes("twist") || lower.includes("ending") || lower.includes("cliffhanger")) {
      return "Twist ideas:\n1) The ally staged the crisis to protect a secret.\n2) The win reveals a bigger threat.\n3) The hero must choose loyalty vs. truth.";
    }
    if (lower.includes("hook") || lower.includes("opening") || lower.includes("cold open")) {
      return "Hook ideas:\n- Start mid‑action with a sensory detail.\n- Open on a question only this episode can answer.\n- Begin with a countdown or urgent message.";
    }
    return "Quick ideas:\n- Hook: drop into action, then reveal the conflict.\n- Twist: ally protects the antagonist.\n- Ending: a fork with real cost.";
  }

  async function sendMessage() {
    const trimmed = message.trim();
    if (!trimmed || loading) return;

    const previous = history;
    const nextHistory = [...history, { role: "user", content: trimmed }];
    setHistory(nextHistory);
    setMessage("");
    setLoading(true);

    try {
      const baseUrl = import.meta.env.VITE_API_URL || "";
      if (!baseUrl) {
        setHistory([...nextHistory, { role: "assistant", content: localReply(trimmed) }]);
        return;
      }

      const res = await fetch(`${baseUrl}/chat`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: trimmed,
          history: previous, // prior turns only
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data?.error || "Request failed");

      if (Array.isArray(data.history)) {
        setHistory(data.history as ChatTurn[]);
      } else {
        setHistory([...nextHistory, { role: "assistant", content: data?.reply ?? localReply(trimmed) }]);
      }
    } catch (err: any) {
      setHistory([...nextHistory, { role: "assistant", content: localReply(trimmed) }]);
    } finally {
      setLoading(false);
    }
  }

  function onKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  }

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="right" className="w-[420px] sm:w-[520px] p-0">
        <div className="flex flex-col h-full">
          <SheetHeader className="px-4 py-3 border-b">
            <SheetTitle>AI Story Assistant</SheetTitle>
          </SheetHeader>

          <ScrollArea className="flex-1 px-4 py-3">
            <div className="flex flex-col gap-3">
              {history.length === 0 && (
                <div className="text-sm text-muted-foreground">
                  Enter a prompt and I will help brainstorm, outline, or write a scene.
                </div>
              )}

              {history.map((t, idx) => (
                <div
                  key={idx}
                  className={[
                    "rounded-lg px-3 py-2 text-sm whitespace-pre-wrap",
                    t.role === "user"
                      ? "ml-auto max-w-[90%] bg-muted"
                      : "mr-auto max-w-[90%] bg-secondary",
                  ].join(" ")}
                >
                  {t.content}
                </div>
              ))}
              <div ref={bottomRef} />
            </div>
          </ScrollArea>

          <div className="px-4 py-3 border-t flex flex-col gap-2">
            <Textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={onKeyDown}
              placeholder="Type a prompt… (Enter to send, Shift+Enter for newline)"
              className="min-h-[90px]"
              disabled={loading}
            />
            <div className="flex justify-end gap-2">
              <Button
                variant="secondary"
                onClick={() => setHistory([])}
                disabled={loading || history.length === 0}
              >
                Clear
              </Button>
              <Button onClick={sendMessage} disabled={loading || !message.trim()}>
                {loading ? "Sending..." : "Send"}
              </Button>
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
