import { useNavigate } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import heroBanner from "@/assets/welcome-banner.jpg";

export default function Landing() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen relative overflow-hidden bg-background">
      <div className="absolute inset-0">
        <img
          src={heroBanner}
          alt=""
          className="absolute inset-0 h-full w-full object-cover object-top opacity-80"
        />
        <div className="absolute inset-0 creator-grid opacity-20" />
        <div className="absolute top-16 -right-20 h-72 w-72 rounded-full bg-primary/20 blur-3xl" />
        <div className="absolute bottom-0 -left-20 h-80 w-80 rounded-full bg-accent/15 blur-3xl" />
        <div className="absolute inset-0 bg-gradient-to-b from-background/10 via-background/55 to-background" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
      </div>

      <div className="relative z-10 min-h-screen flex flex-col">
        <header className="flex items-center justify-between px-6 md:px-12 py-6">
          <img
            src="/logo.png"
            alt="Storyverse Logo"
            className="h-10 md:h-12 w-auto object-contain"
          />
          <button
            onClick={() => navigate("/login")}
            className="bg-primary hover:bg-primary/90 text-primary-foreground px-4 py-2 rounded-full text-sm font-semibold transition-colors"
          >
            Sign In
          </button>
        </header>

        <div className="flex-1 flex flex-col items-center justify-center px-6 text-center">
          <div className="flex flex-wrap items-center justify-center gap-2 text-xs uppercase tracking-[0.2em] text-muted-foreground mb-4">
            <span className="rounded-full border border-border bg-card/60 px-3 py-1">Season Planning</span>
            <span className="rounded-full border border-border bg-card/60 px-3 py-1">AI Story Lab</span>
            <span className="rounded-full border border-border bg-card/60 px-3 py-1">Creator Lounge</span>
          </div>

          <h2 className="font-display text-4xl md:text-6xl lg:text-7xl text-foreground mb-4 max-w-4xl leading-tight">
            Build your story world.
            <br />
            Launch episodes with purpose.
          </h2>

          <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl">
            Storyverse is the studio for creators who want to plan, produce, and grow like a series.
            Turn a single idea into a full episode pipeline with hooks, scripts, and posting intel.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 w-full max-w-xl justify-center">
            <button
              onClick={() => navigate("/signup")}
              className="h-14 px-8 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold text-lg rounded-full flex items-center justify-center gap-2 transition-colors"
            >
              Get Started
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>

          <div className="mt-10 grid gap-4 md:grid-cols-4 w-full max-w-5xl text-left">
            {[
              { title: "Season Board", body: "Move ideas → script → posted." },
              { title: "AI Story Lab", body: "Generate hooks and scripts." },
              { title: "Posting Intel", body: "Best time + trend lift." },
              { title: "Creator Lounge", body: "Find editors & writers." },
            ].map((item) => (
              <div key={item.title} className="rounded-2xl border border-border bg-card/70 p-4 backdrop-blur">
                <p className="font-semibold">{item.title}</p>
                <p className="text-sm text-muted-foreground mt-2">{item.body}</p>
              </div>
            ))}
          </div>

          <div className="mt-8 grid w-full max-w-4xl gap-4 md:grid-cols-3 text-left">
            {[
              { title: "Episode cadence", body: "Lock a weekly release rhythm with reminders and milestones." },
              { title: "Story arcs", body: "Map multi-episode themes so every post builds momentum." },
              { title: "Audience signals", body: "Spot what hooks and endings drive saves and shares." },
            ].map((item) => (
              <div key={item.title} className="rounded-2xl border border-border bg-background/70 p-4">
                <p className="text-sm font-semibold text-foreground">{item.title}</p>
                <p className="text-sm text-muted-foreground mt-2">{item.body}</p>
              </div>
            ))}
          </div>

          <div className="mt-14 w-full max-w-5xl text-left">
            <div className="flex items-center justify-between gap-4 mb-6">
              <div>
                <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">FAQ</p>
                <h3 className="text-2xl md:text-3xl font-semibold text-foreground">
                  Frequently Asked Questions
                </h3>
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              {[
                {
                  question: "How is Storyverse different from a normal content calendar?",
                  answer:
                    "It treats your content like a series, so you plan story arcs, episodes, and releases in one flow instead of scattered notes.",
                },
                {
                  question: "What does the AI help with?",
                  answer:
                    "Turn ideas into hooks, outlines, and short scripts, plus get suggestions for strong endings and next episodes.",
                },
                {
                  question: "Do I need a team to use it?",
                  answer:
                    "No. Solo creators can run their whole pipeline, and teams can collaborate with writers, editors, and designers.",
                },
                {
                  question: "Can I track what’s working?",
                  answer:
                    "Yes—Storyverse highlights the best time to post and simple performance signals per episode.",
                },
              ].map((item) => (
                <div key={item.question} className="rounded-2xl border border-border bg-card/70 p-5 backdrop-blur">
                  <p className="font-semibold text-foreground">{item.question}</p>
                  <p className="text-sm text-muted-foreground mt-2">{item.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
