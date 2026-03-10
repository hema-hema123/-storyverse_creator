import Navbar from "@/components/Navbar";
import HeroBanner from "@/components/HeroBanner";
import ShowRow from "@/components/ShowRow";
import { useFirestoreShows } from "@/hooks/useFirestoreShows";
import { useFirestoreStats } from "@/hooks/useFirestoreStats";
import { Sparkles, Clock, Users, Video, PenTool, UploadCloud, Loader2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import StoryChatSheet from "@/components/StoryChatSheet";

const Index = () => {
  const { shows, loading: showsLoading } = useFirestoreShows();
  const { creatorStats, loading: statsLoading } = useFirestoreStats();
  const navigate = useNavigate();
  const [chatOpen, setChatOpen] = useState(false);
  const [showAllCreators, setShowAllCreators] = useState(false);

  const featuredShow = shows[0];

  const yourStories = shows;
  const trendingNow = [...shows].sort((a, b) => b.views - a.views);

  const userNiche = creatorStats.primaryNiche;
  const trendingInNiche = shows.filter((s) => s.genre === userNiche);

  if (showsLoading || statsLoading || !featuredShow) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <HeroBanner show={featuredShow} />

      {/* Studio Quick Actions */}
      <div className="relative z-10 -mt-24 px-4 md:px-12">
        <div className="grid gap-3 sm:gap-4 grid-cols-1 sm:grid-cols-3">
          <button
            onClick={() => setChatOpen(true)}
            className="rounded-2xl border border-border bg-card/90 backdrop-blur p-5 text-left hover:border-primary/50 hover:shadow-lg hover:shadow-primary/10 transition-all duration-300"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">AI Story Lab</p>
                <p className="text-base md:text-lg font-semibold mt-2">Generate hooks & scripts</p>
              </div>
              <Sparkles className="w-6 h-6 text-primary" />
            </div>
            <p className="text-sm text-muted-foreground mt-3">Turn a rough idea into a ready-to-shoot outline in minutes.</p>
          </button>
          <div className="rounded-2xl border border-border bg-card/90 backdrop-blur p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">Posting Intel</p>
                <p className="text-base md:text-lg font-semibold mt-2">Best time to post</p>
              </div>
              <Clock className="w-6 h-6 text-primary" />
            </div>
            <p className="text-sm text-muted-foreground mt-3">Next slot: Thu 7:30 PM. Expected lift +18%.</p>
          </div>
          <button
            onClick={() => {
              const el = document.getElementById("creator-lounge");
              if (el) el.scrollIntoView({ behavior: "smooth" });
            }}
            className="rounded-2xl border border-border bg-card/90 backdrop-blur p-5 text-left hover:border-primary/50 hover:shadow-lg hover:shadow-primary/10 transition-all duration-300"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">Creator Lounge</p>
                <p className="text-base md:text-lg font-semibold mt-2">Find collaborators</p>
              </div>
              <Users className="w-6 h-6 text-primary" />
            </div>
            <p className="text-sm text-muted-foreground mt-3">Editors, designers, and writers ready for your series.</p>
          </button>
        </div>
      </div>

      {/* Episode Pipeline */}
      <div className="relative z-10 mt-10 px-4 md:px-12">
        <div className="rounded-3xl border border-border bg-card/80 backdrop-blur p-6 md:p-8">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">Season Board</p>
              <h2 className="text-xl md:text-2xl font-semibold mt-2">Move episodes from idea → posted</h2>
            </div>
            <button
              onClick={() => navigate("/episode/new")}
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              New Episode
            </button>
          </div>

          <div className="mt-6 grid gap-3 grid-cols-2 md:grid-cols-4">
            {[
              { title: "Idea", icon: Sparkles, items: ["What if…", "Pilot hook", "Cold open"] },
              { title: "Script", icon: PenTool, items: ["Outline draft", "Scene beats"] },
              { title: "Shoot", icon: Video, items: ["Shot list", "B-roll"] },
              { title: "Posted", icon: UploadCloud, items: ["Ep 1 live", "Ep 2 teaser"] },
            ].map((col) => (
              <div key={col.title} className="rounded-2xl border border-border bg-background/60 p-4">
                <div className="flex items-center gap-2 text-sm font-semibold">
                  <col.icon className="w-4 h-4 text-primary" />
                  {col.title}
                </div>
                <div className="mt-3 space-y-2">
                  {col.items.map((item) => (
                    <div key={item} className="rounded-xl bg-card px-3 py-2 text-sm text-muted-foreground">
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Creator Lounge */}
      <div id="creator-lounge" className="relative z-10 mt-10 px-4 md:px-12">
        <div className="rounded-3xl border border-border bg-card/80 backdrop-blur p-6 md:p-8">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">Creator Lounge</p>
              <h2 className="text-xl md:text-2xl font-semibold mt-2">Find collaborators in your niche</h2>
            </div>
            <button
              onClick={() => setShowAllCreators((v) => !v)}
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              {showAllCreators ? "Show less" : "Browse all"}
            </button>
          </div>

          <div className="mt-6 grid gap-3 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
            {([
              { id: "ari", name: "Ari V.", role: "Editor", niche: "Fantasy recaps" },
              { id: "mina", name: "Mina K.", role: "Designer", niche: "Cinematic titles" },
              { id: "theo", name: "Theo J.", role: "Writer", niche: "Sci‑fi hooks" },
              { id: "nova", name: "Nova R.", role: "Animator", niche: "Sci-fi storyboards" },
              { id: "jules", name: "Jules T.", role: "Sound Designer", niche: "Ambient scoring" },
              { id: "priya", name: "Priya S.", role: "Writer", niche: "Romantic drama" },
            ].slice(0, showAllCreators ? 6 : 3)).map((person) => (
              <div key={person.id} className="rounded-2xl border border-border bg-background/60 p-4 hover:border-primary/30 transition-colors">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary font-semibold text-sm">
                    {person.name.charAt(0)}
                  </div>
                  <div>
                    <p className="font-semibold">{person.name}</p>
                    <p className="text-sm text-muted-foreground">{person.role}</p>
                  </div>
                </div>
                <p className="text-xs text-muted-foreground mt-2">{person.niche}</p>
                <button 
                  onClick={() => navigate(`/creators/${person.id}`)} 
                  className="mt-4 text-xs font-semibold text-primary hover:underline">
                  Connect
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="relative z-10 pt-10 pb-20">
        <div id="your-stories">
          <ShowRow title="Your Series" shows={yourStories} />
        </div>
        <div id="new-on-storyverse">
          <ShowRow title="Trending on Storyverse" shows={trendingNow} />
        </div>
        <ShowRow
          title={`Trending in ${userNiche}`}
          shows={trendingInNiche.length > 0 ? trendingInNiche : yourStories}
        />
      </div>

      {/* AI Story Lab Chat Sheet */}
      <StoryChatSheet
        open={chatOpen}
        onOpenChange={setChatOpen}
        initialPrompt=""
      />
    </div>
  );
};

export default Index;
