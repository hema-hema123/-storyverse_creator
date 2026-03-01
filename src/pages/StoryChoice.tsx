import { useParams, Link, useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { shows } from "@/data/mockData";
import { Button } from "@/components/ui/button";

const StoryChoice = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // Find episode
  let foundEpisode = null;
  let foundShow = null;

  for (const show of shows) {
    const episode = show.episodes.find((e) => e.id === id);
    if (episode) {
      foundEpisode = episode;
      foundShow = show;
      break;
    }
  }

  if (!foundEpisode || !foundShow || !foundEpisode.choiceA || !foundEpisode.choiceB) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p>Choice not available</p>
      </div>
    );
  }

  const handleChoice = (nextEpisodeId: string) => {
    // Navigate to the next episode based on choice
    navigate(`/episode/${nextEpisodeId}`);
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Background with show image */}
      <div className="absolute inset-0 -z-10">
        <img
          src={foundShow.image}
          alt=""
          className="w-full h-full object-cover opacity-20 blur-sm"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-background/60" />
      </div>

      {/* Back Button */}
      <div className="pt-8 px-4 md:px-12">
        <Link
          to={`/episode/${id}`}
          className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Episode
        </Link>
      </div>

      {/* Choice Content */}
      <div className="flex-1 flex flex-col items-center justify-center px-4 py-12">
        <div className="text-center mb-12">
          <p className="text-primary font-semibold mb-2">
            {foundShow.title} - Episode {foundEpisode.number}
          </p>
          <h1 className="font-display text-4xl md:text-6xl tracking-wide mb-4">
            CHOOSE YOUR PATH
          </h1>
          <p className="text-muted-foreground max-w-lg mx-auto">
            The story has reached a critical moment. Your choice will determine
            how the narrative unfolds.
          </p>
        </div>

        {/* Choice Buttons */}
        <div className="grid md:grid-cols-2 gap-6 w-full max-w-3xl">
          <button
            onClick={() => handleChoice(foundEpisode.choiceA!.nextEpisodeId)}
            className="group relative p-8 bg-card hover:bg-accent/50 rounded-lg border border-border hover:border-primary transition-all duration-300 text-left"
          >
            <div className="absolute top-4 left-4">
              <span className="w-10 h-10 rounded-full bg-primary/20 text-primary font-display text-2xl flex items-center justify-center">
                A
              </span>
            </div>
            <div className="pt-12">
              <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
                {foundEpisode.choiceA.label}
              </h3>
              <p className="text-muted-foreground text-sm">
                Choose this path to continue the story.
              </p>
            </div>
            <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
              <span className="text-primary text-sm font-medium">Select →</span>
            </div>
          </button>

          <button
            onClick={() => handleChoice(foundEpisode.choiceB!.nextEpisodeId)}
            className="group relative p-8 bg-card hover:bg-accent/50 rounded-lg border border-border hover:border-primary transition-all duration-300 text-left"
          >
            <div className="absolute top-4 left-4">
              <span className="w-10 h-10 rounded-full bg-primary/20 text-primary font-display text-2xl flex items-center justify-center">
                B
              </span>
            </div>
            <div className="pt-12">
              <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
                {foundEpisode.choiceB.label}
              </h3>
              <p className="text-muted-foreground text-sm">
                Choose this path to continue the story.
              </p>
            </div>
            <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
              <span className="text-primary text-sm font-medium">Select →</span>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default StoryChoice;
