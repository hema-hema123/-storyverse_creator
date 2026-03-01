import { useMemo, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Send, ChevronLeft, User } from "lucide-react";
import Navbar from "@/components/Navbar";
import ShowRow from "@/components/ShowRow";
import { shows } from "@/data/mockData";
import { Button } from "@/components/ui/button";

const creators = [
  { id: "ari", name: "Ari V.", role: "Editor", niche: "Fantasy recaps" },
  { id: "mina", name: "Mina K.", role: "Designer", niche: "Cinematic titles" },
  { id: "theo", name: "Theo J.", role: "Writer", niche: "Sci‑fi hooks" },
];

type Message = { id: string; text: string; from: "you" | "them"; time: string };

const CreatorProfile = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const creator = useMemo(() => creators.find((c) => c.id === id) ?? creators[0], [id]);

  const [messageDraft, setMessageDraft] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      text: "Hey! I’m open to collabs. Share your series idea and timeline.",
      from: "them",
      time: "09:12",
    },
  ]);
  const messageInputRef = useRef<HTMLInputElement | null>(null);

  const generateReply = (input: string, history: Message[]) => {
    const text = input.toLowerCase().trim();
    const lastAssistant = [...history].reverse().find((m) => m.from === "them")?.text ?? "";
    const pick = (options: string[]) => options.find((o) => o !== lastAssistant) ?? options[0];

    if (/(^|\b)(hi|hello|hey|yo)\b/.test(text)) {
      return pick([
        "Hey! What kind of series are you building?",
        "Hi! Share your niche and the vibe you’re going for.",
        "Hey there — what’s the episode about?",
      ]);
    }

    if (/(^|\b)(yes|yep|yeah|sure|ok|okay|definitely)\b/.test(text)) {
      return pick([
        "Great — send your series idea, target platform, and deadline.",
        "Awesome. Drop your outline or a quick logline and I’ll respond.",
        "Perfect. What’s the timeline and the vibe you’re aiming for?",
      ]);
    }

    if (text.includes("outline")) {
      return pick([
        "Paste your outline and I’ll mark pacing, stakes, and the cliffhanger.",
        "Send the beat list — I’ll tighten the arc and add a hook.",
      ]);
    }

    if (text.includes("script") || text.includes("dialogue")) {
      return pick([
        "Share the scene or script draft and I’ll polish pacing + dialogue.",
        "Drop a paragraph and I’ll punch up the hook and ending.",
      ]);
    }

    if (text.includes("idea") || text.includes("concept") || text.includes("logline")) {
      return pick([
        "Give me a 1‑line logline + tone. I’ll suggest a hook and twist.",
        "Share your concept and target platform — I’ll map a quick arc.",
      ]);
    }

    if (text.includes("timeline") || text.includes("deadline")) {
      return pick([
        "When do you want it published? I can suggest milestones.",
        "Got it — what’s the release date and how long is the episode?",
      ]);
    }

    return pick([
      "Tell me the episode goal (views, followers, or story arc) and I’ll tailor edits.",
      "What’s the target platform and length? I’ll tailor the structure.",
      "Drop a quick summary and I’ll suggest a hook, twist, and ending.",
    ]);
  };

  const handleSendMessage = () => {
    const trimmed = messageDraft.trim();
    if (!trimmed) return;
    const now = new Date();
    const time = now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
    setMessages((prev) => {
      const next = [...prev, { id: `${Date.now()}`, text: trimmed, from: "you", time }];
      window.setTimeout(() => {
        const replyTime = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
        const replyText = generateReply(trimmed, next);
        setMessages((current) => [
          ...current,
          { id: `${Date.now()}-reply`, text: replyText, from: "them", time: replyTime },
        ]);
      }, 700);
      return next;
    });
    setMessageDraft("");
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="px-4 md:px-12 py-8 max-w-6xl mx-auto">
        <button
          onClick={() => navigate(-1)}
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
        >
          <ChevronLeft className="w-4 h-4" />
          Back to Creator Lounge
        </button>

        <div className="mt-6 grid gap-6 xl:grid-cols-[1.15fr_0.85fr] items-start">
          <div className="rounded-3xl border border-border bg-card/80 backdrop-blur p-6 md:p-8">
            <div className="flex items-center gap-4">
              <div className="w-20 h-20 rounded-2xl bg-primary/20 flex items-center justify-center">
                <User className="w-10 h-10 text-primary" />
              </div>
              <div>
                <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">Creator Profile</p>
                <h1 className="text-2xl md:text-3xl font-semibold">{creator.name}</h1>
                <p className="text-primary font-medium">{creator.role}</p>
                <p className="text-sm text-muted-foreground mt-1">{creator.niche}</p>
              </div>
            </div>

            <div className="mt-6 grid gap-4 md:grid-cols-3">
              {[
                { label: "Collabs", value: "28" },
                { label: "Response time", value: "2 hrs" },
                { label: "Availability", value: "Open" },
              ].map((stat) => (
                <div key={stat.label} className="rounded-2xl border border-border bg-background/60 p-4">
                  <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">{stat.label}</p>
                  <p className="text-lg font-semibold mt-2">{stat.value}</p>
                </div>
              ))}
            </div>

            <div className="mt-6">
              <h2 className="text-lg font-semibold">About</h2>
              <p className="text-sm text-muted-foreground mt-2">
                {creator.name} is a {creator.role.toLowerCase()} specializing in {creator.niche.toLowerCase()}.
                They help emerging creators craft memorable story arcs, polish episode pacing, and deliver cinematic vibes.
              </p>
            </div>

            <div className="mt-8">
              <ShowRow title="Featured Work" shows={shows.slice(0, 5)} />
            </div>
          </div>

          <div className="rounded-3xl border border-border bg-card/80 backdrop-blur p-6 md:p-8">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">Direct Message</p>
                <h2 className="text-xl font-semibold mt-2">Chat with {creator.name}</h2>
              </div>
              <Button variant="outline" onClick={() => messageInputRef.current?.focus()}>
                Message
              </Button>
            </div>

            <div className="mt-6 max-h-[320px] md:max-h-[360px] overflow-y-auto space-y-3 rounded-2xl border border-border bg-background/60 p-4">
              {messages.map((msg) => (
                <div key={msg.id} className={`flex ${msg.from === "you" ? "justify-end" : "justify-start"}`}>
                  <div
                    className={`max-w-[80%] rounded-2xl px-3 py-2 text-sm ${
                      msg.from === "you" ? "bg-primary text-primary-foreground" : "bg-muted text-foreground"
                    }`}
                  >
                    <p>{msg.text}</p>
                    <p className="mt-1 text-[10px] opacity-70">{msg.time}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-4 flex flex-col sm:flex-row gap-2">
              <input
                ref={messageInputRef}
                value={messageDraft}
                onChange={(e) => setMessageDraft(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    handleSendMessage();
                  }
                }}
                placeholder={`Message ${creator.name}`}
                className="flex-1 h-11 rounded-xl border border-border bg-background/70 px-3 text-sm"
              />
              <Button className="gap-2 sm:w-auto w-full" onClick={handleSendMessage}>
                <Send className="w-4 h-4" />
                Send
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreatorProfile;
