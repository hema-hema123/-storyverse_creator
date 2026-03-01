import { ChevronLeft, ChevronRight } from "lucide-react";
import { useRef, useState } from "react";
import ShowCard from "./ShowCard";
import { Show } from "@/data/mockData";

interface ShowRowProps {
  title: string;
  shows: Show[];
}

const ShowRow = ({ title, shows }: ShowRowProps) => {
  const rowRef = useRef<HTMLDivElement>(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);

  const scroll = (direction: "left" | "right") => {
    if (rowRef.current) {
      const scrollAmount = direction === "left" ? -600 : 600;
      rowRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  const handleScroll = () => {
    if (rowRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = rowRef.current;
      setShowLeftArrow(scrollLeft > 0);
      setShowRightArrow(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  return (
    <section className="relative group/row py-6">
      <div className="px-4 md:px-12 flex items-center justify-between">
        <h2 className="text-lg md:text-xl font-semibold tracking-wide">
          {title}
        </h2>
        <button className="hidden md:flex items-center gap-2 text-xs text-muted-foreground hover:text-foreground transition-colors">
          View all
        </button>
      </div>

      <div className="relative mt-3">
        {showLeftArrow && (
          <button
            onClick={() => scroll("left")}
            className="absolute left-0 top-0 bottom-0 z-10 w-12 bg-gradient-to-r from-background via-background/70 to-transparent flex items-center justify-start pl-2 opacity-0 group-hover/row:opacity-100 transition-opacity"
          >
            <ChevronLeft className="w-7 h-7" />
          </button>
        )}

        <div
          ref={rowRef}
          onScroll={handleScroll}
          className="flex overflow-x-auto scrollbar-hide px-4 md:px-12"
          style={{ gap: "12px" }}
        >
          {shows.map((show) => (
            <ShowCard key={show.id} show={show} />
          ))}
        </div>

        {showRightArrow && (
          <button
            onClick={() => scroll("right")}
            className="absolute right-0 top-0 bottom-0 z-10 w-12 bg-gradient-to-l from-background via-background/70 to-transparent flex items-center justify-end pr-2 opacity-0 group-hover/row:opacity-100 transition-opacity"
          >
            <ChevronRight className="w-7 h-7" />
          </button>
        )}
      </div>
    </section>
  );
};

export default ShowRow;
