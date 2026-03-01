import { Link } from "react-router-dom";
import { Play, Info } from "lucide-react";
import { Show } from "@/data/mockData";

interface ShowCardProps {
  show: Show;
}

const ShowCard = ({ show }: ShowCardProps) => {
  return (
    <Link
      to={`/show/${show.id}`}
      className="relative group flex-shrink-0 w-[220px] md:w-[260px] overflow-hidden rounded-2xl border border-border bg-card/80 transition-transform duration-300 hover:-translate-y-1 hover:shadow-xl"
    >
      <div className="aspect-[16/10] relative">
        <img src={show.image} alt={show.title} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {show.badge && (
          <div className="absolute top-3 left-3 px-2 py-1 rounded-full bg-primary/90 text-white text-[10px] uppercase tracking-widest">
            {show.badge}
          </div>
        )}

        <div className="absolute bottom-3 left-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <h3 className="font-semibold text-sm mb-1 line-clamp-1">{show.title}</h3>
          <p className="text-xs text-muted-foreground mb-2">{show.genre}</p>
          <div className="flex gap-2">
            <button className="p-2 rounded-full bg-foreground text-background hover:bg-foreground/90 transition-colors">
              <Play className="w-3 h-3 fill-current" />
            </button>
            <button className="p-2 rounded-full border border-muted-foreground/60 hover:border-foreground transition-colors">
              <Info className="w-3 h-3" />
            </button>
          </div>
        </div>
      </div>

      <div className="px-4 py-3">
        <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Series</p>
        <p className="font-semibold mt-1 line-clamp-1">{show.title}</p>
        <p className="text-xs text-muted-foreground mt-1">
          {show.episodes.length} episodes · {show.views.toLocaleString()} views
        </p>
        <div className="mt-3 h-1.5 rounded-full bg-muted">
          <div className="h-full bg-primary w-1/3 rounded-full" />
        </div>
      </div>
    </Link>
  );
};

export default ShowCard;
