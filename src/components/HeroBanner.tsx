import { Play, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import { Show } from "@/data/mockData";
import { Button } from "./ui/button";
import { useState } from "react";
import StoryChatSheet from "@/components/StoryChatSheet";

interface HeroBannerProps {
  show: Show;
}

const HeroBanner = ({ show }: HeroBannerProps) => {
  const [chatOpen, setChatOpen] = useState(false);

  return (
    <div className="relative h-[72vh] md:h-[82vh] w-full overflow-hidden">
      <div className="absolute inset-0">
        <img src={show.image} alt={show.title} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/70 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
      </div>

      <div className="absolute inset-0" />

      <div className="absolute bottom-[18%] left-4 md:left-12 max-w-2xl z-10">
        <p className="text-xs uppercase tracking-[0.3em] text-primary/90 mb-3">
          Featured Series
        </p>
        <h1 className="font-display text-4xl md:text-6xl lg:text-7xl leading-tight">
          {show.title}
        </h1>
        <p className="text-sm md:text-base mt-4 text-foreground/80 line-clamp-3">
          {show.description}
        </p>

        <div className="mt-6 flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
          <span className="px-3 py-1 rounded-full bg-secondary/80 border border-border">
            {show.genre}
          </span>
          <span>{show.episodes.length} episodes</span>
          <span>{show.views.toLocaleString()} total views</span>
        </div>

        <div className="mt-6 flex gap-3">
          <Link to={`/show/${show.id}`}>
            <Button size="lg" className="bg-foreground text-background hover:bg-foreground/90 font-semibold gap-2">
              <Play className="w-5 h-5 fill-current" />
              Open series
            </Button>
          </Link>
          <Button
            size="lg"
            variant="secondary"
            className="font-semibold gap-2"
            onClick={() => setChatOpen(true)}
          >
            <Sparkles className="w-5 h-5" />
            AI suggestions
          </Button>
        </div>
      </div>

      <div className="absolute bottom-[18%] right-4 md:right-12 hidden md:flex flex-col items-end gap-3">
        <div className="rounded-2xl border border-border bg-card/80 backdrop-blur px-5 py-4 max-w-xs">
          <p className="text-xs uppercase tracking-[0.25em] text-muted-foreground">Release readiness</p>
          <p className="text-lg font-semibold mt-1">Next episode ready in 2 days</p>
          <div className="mt-3 h-2 rounded-full bg-muted overflow-hidden">
            <div className="h-full bg-primary w-4/5" />
          </div>
        </div>
      </div>

      <StoryChatSheet
        open={chatOpen}
        onOpenChange={setChatOpen}
        initialPrompt={`Suggest 3 hooks and 1 twist for ${show.title}.`}
      />
    </div>
  );
};

export default HeroBanner;
