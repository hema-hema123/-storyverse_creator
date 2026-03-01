import { useNavigate } from "react-router-dom";
import { ChevronRight, Sparkles, Users } from "lucide-react";

const Auth = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen relative overflow-hidden bg-background">
      {/* Ambient background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 creator-grid opacity-30" />
        <div className="absolute -top-24 -right-24 h-72 w-72 rounded-full bg-primary/25 blur-3xl" />
        <div className="absolute top-1/2 -left-24 h-80 w-80 rounded-full bg-accent/20 blur-3xl" />
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background/70 to-background" />
      </div>

      <div className="relative z-10 min-h-screen flex flex-col">
        {/* Header */}
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

        {/* Hero */}
        <div className="flex-1 grid lg:grid-cols-2 gap-10 items-center px-6 md:px-12 pb-16">
          <div>
            <p className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.3em] text-primary/90 mb-4">
              <Sparkles className="w-4 h-4" />
              Build a story world
            </p>
            <h1 className="font-display text-4xl md:text-6xl lg:text-7xl leading-tight">
              Plan episodes. Craft stories. Grow your audience.
            </h1>
            <p className="mt-5 text-lg text-muted-foreground max-w-xl">
              Storyverse turns scattered ideas into a series pipeline—scripts, hooks, posting intel, and audience insights—all in one studio.
            </p>

            <div className="mt-8 flex flex-col sm:flex-row gap-3">
              <button
                onClick={() => navigate("/signup")}
                className="h-12 px-6 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold rounded-full flex items-center justify-center gap-2 transition-colors"
              >
                Start your season
                <ChevronRight className="w-5 h-5" />
              </button>
              <button
                onClick={() => navigate("/browse")}
                className="h-12 px-6 bg-secondary/70 border border-border rounded-full text-foreground font-semibold hover:bg-secondary transition-colors"
              >
                Explore the studio
              </button>
            </div>

            <div className="mt-8 flex items-center gap-6 text-sm text-muted-foreground">
              <div>
                <p className="text-foreground font-semibold">AI Story Lab</p>
                <p>Hooks, outlines, endings</p>
              </div>
              <div>
                <p className="text-foreground font-semibold">Posting Intel</p>
                <p>Best time, trend lift</p>
              </div>
            </div>
          </div>

          {/* Feature Cards */}
          <div className="grid gap-4">
            <div className="rounded-2xl border border-border bg-card/80 p-5 backdrop-blur">
              <p className="text-sm text-muted-foreground">Season Board</p>
              <h3 className="text-xl font-semibold mt-1">Episode pipeline at a glance</h3>
              <div className="mt-4 flex flex-wrap gap-2">
                {[
                  { label: "Idea", tone: "bg-primary/15 text-primary" },
                  { label: "Script", tone: "bg-accent/20 text-accent-foreground" },
                  { label: "Shoot", tone: "bg-muted text-foreground" },
                  { label: "Posted", tone: "bg-foreground text-background" },
                ].map((stage) => (
                  <span key={stage.label} className={`px-3 py-1 rounded-full text-xs font-semibold ${stage.tone}`}>
                    {stage.label}
                  </span>
                ))}
              </div>
            </div>

            <div className="rounded-2xl border border-border bg-card/80 p-5 backdrop-blur">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">AI Story Lab</p>
                  <h3 className="text-xl font-semibold mt-1">Turn ideas into scripts</h3>
                </div>
                <Sparkles className="w-6 h-6 text-primary" />
              </div>
              <p className="mt-3 text-sm text-muted-foreground">
                Draft hooks, scene beats, and alternate endings tailored to your niche.
              </p>
            </div>

            <div className="rounded-2xl border border-border bg-card/80 p-5 backdrop-blur flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Creator Lounge</p>
                <h3 className="text-xl font-semibold mt-1">Find editors & collaborators</h3>
              </div>
              <div className="h-10 w-10 rounded-full bg-primary/15 flex items-center justify-center">
                <Users className="w-5 h-5 text-primary" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
