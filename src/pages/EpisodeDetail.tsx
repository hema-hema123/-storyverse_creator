import { useParams, Link, useNavigate } from "react-router-dom";
import { ArrowLeft, Save, Users, BookOpen, Sparkles } from "lucide-react";
import { useMemo, useState } from "react";
import { shows } from "@/data/mockData";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const EpisodeDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  type EpisodeDraft = {
    id: string;
    number: number;
    title: string;
    description: string;
    plot: string;
    characters: string[];
    additionalElements: string;
    isFinished?: boolean;
    choiceA?: { label: string };
    choiceB?: { label: string };
  };

  const isNewEpisode = id === "new";
  const fallbackShow = shows[0];
  const draftEpisode: EpisodeDraft = {
    id: "new",
    number: fallbackShow.episodes.length + 1,
    title: "New Episode Draft",
    description: "Start a fresh episode and shape the story arc.",
    plot: "",
    characters: [],
    additionalElements: "",
    isFinished: false,
  };

  // Find episode across all shows
  let foundEpisode: EpisodeDraft | null = isNewEpisode ? draftEpisode : null;
  let foundShow = isNewEpisode ? fallbackShow : null;
  
  for (const show of shows) {
    const episode = show.episodes.find((e) => e.id === id);
    if (episode) {
      foundEpisode = episode;
      foundShow = show;
      break;
    }
  }

  const [plot, setPlot] = useState(foundEpisode?.plot || "");
  const [characters, setCharacters] = useState(
    foundEpisode?.characters.join("\n") || ""
  );
  const [additionalElements, setAdditionalElements] = useState(
    foundEpisode?.additionalElements || ""
  );
  const [aiPrompt, setAiPrompt] = useState("");
  const [aiIdeas, setAiIdeas] = useState<{ id: string; title: string; body: string }[]>([]);

  const defaultIdeas = useMemo(
    () => [
      {
        id: "hook-default",
        title: "Hook",
        body: "Open with a high-stakes question that reveals the episode theme in 2 lines.",
      },
      {
        id: "outline-default",
        title: "Beat outline",
        body: "Cold open twist → midpoint reversal → cliffhanger payoff.",
      },
      {
        id: "ending-default",
        title: "Ending",
        body: "Leave a choice that forces the protagonist to betray or trust the ally.",
      },
    ],
    []
  );

  if (!foundEpisode || !foundShow) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p>Episode not found</p>
      </div>
    );
  }

  const handleSave = () => {
    // In a real app, this would save to backend
    console.log("Saving:", { plot, characters, additionalElements });
  };

  const handleGenerateIdeas = () => {
    const base = aiPrompt.trim();
    const prompt = base.toLowerCase();
    const makeId = (suffix: string) => `${suffix}-${Date.now()}`;

    if (prompt.includes("name") || prompt.includes("protagonist") || prompt.includes("character")) {
      setAiIdeas([
        { id: makeId("name-1"), title: "Name set 1", body: "Avery Cross, Juno Vale, Kai Monroe." },
        { id: makeId("name-2"), title: "Name set 2", body: "Rhea Sol, Milo Hart, Siena Park." },
        { id: makeId("name-3"), title: "Name set 3", body: "Theo Ash, Lila Frost, Nova Reed." },
      ]);
      return;
    }

    if (prompt.includes("twist") || prompt.includes("ending") || prompt.includes("cliffhanger")) {
      setAiIdeas([
        {
          id: makeId("twist-1"),
          title: "Twist ending",
          body: "The ally reveals they staged the crisis to protect the protagonist’s secret.",
        },
        {
          id: makeId("twist-2"),
          title: "Cliffhanger",
          body: "The protagonist wins — then gets a message that flips the victory into a threat.",
        },
        {
          id: makeId("twist-3"),
          title: "Choice",
          body: "Force a fork: save the team now or save the mission long‑term.",
        },
      ]);
      return;
    }

    if (prompt.includes("hook") || prompt.includes("opening") || prompt.includes("cold open")) {
      setAiIdeas([
        {
          id: makeId("hook-1"),
          title: "Cold open",
          body: "Start with a sensory detail, then cut to the protagonist mid‑mistake.",
        },
        {
          id: makeId("hook-2"),
          title: "Inciting moment",
          body: "Open with a question that only the episode can answer.",
        },
        {
          id: makeId("hook-3"),
          title: "Immediate tension",
          body: "Begin in motion — a chase, a countdown, or a confession.",
        },
      ]);
      return;
    }

    if (prompt.includes("outline") || prompt.includes("beats") || prompt.includes("structure")) {
      setAiIdeas([
        {
          id: makeId("outline-1"),
          title: "3‑act beats",
          body: "Setup → reversal → decision with a consequence that sets the next episode.",
        },
        {
          id: makeId("outline-2"),
          title: "Pacing",
          body: "Short opener, mid‑episode twist, slow burn into a decisive finale.",
        },
        {
          id: makeId("outline-3"),
          title: "Emotional arc",
          body: "Hope → doubt → commitment, anchored by one visual motif.",
        },
      ]);
      return;
    }

    setAiIdeas([
      {
        id: makeId("gen-1"),
        title: "Hook",
        body: "Start mid‑action with a sensory detail, then reveal the conflict in one line.",
      },
      {
        id: makeId("gen-2"),
        title: "Twist",
        body: "The ally is actually protecting the antagonist — force a trust test.",
      },
      {
        id: makeId("gen-3"),
        title: "Ending",
        body: "Offer two paths that each cost something different (risk vs. reputation).",
      },
    ]);
  };

  const handleInsertIdea = (idea: { title: string; body: string }) => {
    const snippet = `${idea.title}: ${idea.body}`;
    const titleLower = idea.title.toLowerCase();
    if (titleLower.includes("name")) {
      const names = idea.body.replace(/\./g, "").split(",").map((s) => s.trim()).join("\n");
      setCharacters((prev) => (prev ? `${prev}\n${names}` : names));
      return;
    }
    setPlot((prev) => (prev ? `${prev}\n\n${snippet}` : snippet));
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Header */}
      <div className="pt-24 px-4 md:px-12 pb-8 border-b border-border">
        <div className="flex items-center gap-4 mb-4">
          <Link
            to={`/show/${foundShow.id}`}
            className="p-2 rounded-full hover:bg-accent transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div>
            <p className="text-muted-foreground text-sm">{foundShow.title}</p>
            <h1 className="text-2xl md:text-3xl font-semibold">
              Episode {foundEpisode.number}: {foundEpisode.title}
            </h1>
          </div>
        </div>
        
        <p className="text-muted-foreground max-w-2xl">
          {foundEpisode.description}
        </p>
      </div>

      {/* Editor */}
      <div className="px-4 md:px-12 py-8">
        <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
          <Tabs defaultValue="plot" className="w-full">
            <TabsList className="mb-6 bg-card">
              <TabsTrigger value="plot" className="gap-2">
                <BookOpen className="w-4 h-4" />
                Plot
              </TabsTrigger>
              <TabsTrigger value="characters" className="gap-2">
                <Users className="w-4 h-4" />
                Characters
              </TabsTrigger>
              <TabsTrigger value="elements" className="gap-2">
                <Sparkles className="w-4 h-4" />
                Additional Elements
              </TabsTrigger>
            </TabsList>

            <TabsContent value="plot" className="space-y-4">
              <div>
                <label className="text-sm font-medium mb-2 block">
                  Episode Plot
                </label>
                <Textarea
                  value={plot}
                  onChange={(e) => setPlot(e.target.value)}
                  placeholder="Write your episode plot here..."
                  className="min-h-[320px] bg-card border-border"
                />
              </div>
            </TabsContent>

            <TabsContent value="characters" className="space-y-4">
              <div>
                <label className="text-sm font-medium mb-2 block">
                  Characters (one per line)
                </label>
                <Textarea
                  value={characters}
                  onChange={(e) => setCharacters(e.target.value)}
                  placeholder="Character Name - Description&#10;Another Character - Their role"
                  className="min-h-[320px] bg-card border-border"
                />
              </div>
            </TabsContent>

            <TabsContent value="elements" className="space-y-4">
              <div>
                <label className="text-sm font-medium mb-2 block">
                  Additional Elements
                </label>
                <Textarea
                  value={additionalElements}
                  onChange={(e) => setAdditionalElements(e.target.value)}
                  placeholder="Setting, mood, themes, notes..."
                  className="min-h-[320px] bg-card border-border"
                />
              </div>
            </TabsContent>
          </Tabs>

          <div className="rounded-3xl border border-border bg-card/80 backdrop-blur p-6 h-fit">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">AI Copilot</p>
                <h2 className="text-lg font-semibold mt-2">Storyverse Assistant</h2>
              </div>
              <Sparkles className="w-5 h-5 text-primary" />
            </div>

            <p className="text-sm text-muted-foreground mt-3">
              Generate hooks, outlines, and endings. Click a suggestion to drop it into your plot.
            </p>

            <div className="mt-4 space-y-3">
              <Input
                value={aiPrompt}
                onChange={(e) => setAiPrompt(e.target.value)}
                placeholder="Ask for ideas: “Give me a twist ending”"
                className="bg-background/70"
              />
              <Button className="w-full gap-2" onClick={handleGenerateIdeas}>
                <Sparkles className="w-4 h-4" />
                Generate ideas
              </Button>
            </div>

            <div className="mt-6 space-y-3">
              {(aiIdeas.length ? aiIdeas : defaultIdeas).map((idea) => (
                <button
                  key={idea.id}
                  onClick={() => handleInsertIdea(idea)}
                  className="w-full text-left rounded-2xl border border-border bg-background/70 p-3 text-sm text-muted-foreground hover:text-foreground hover:border-primary/60 transition-colors"
                >
                  <p className="text-sm font-semibold text-foreground">{idea.title}</p>
                  <p className="text-xs text-muted-foreground mt-1">{idea.body}</p>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Save & Choice Section */}
        <div className="mt-8 pt-8 border-t border-border">
          <div className="flex items-center justify-between mb-8">
            <Button onClick={handleSave} className="gap-2">
              <Save className="w-4 h-4" />
              Save Changes
            </Button>
            
            {foundEpisode.isFinished && (
              <Button 
                variant="outline" 
                className="gap-2"
                onClick={() => navigate(`/episode/${id}/choice`)}
              >
                Preview Story Choice
              </Button>
            )}
          </div>

          {/* Choice Endings Preview */}
          {foundEpisode.isFinished && foundEpisode.choiceA && foundEpisode.choiceB && (
            <div className="bg-card rounded-lg p-6">
              <h3 className="font-semibold mb-4">Story Endings</h3>
              <p className="text-muted-foreground text-sm mb-4">
                This episode has multiple endings. Readers will choose their path.
              </p>
              
              <div className="grid md:grid-cols-2 gap-4">
                <div className="p-4 bg-accent/30 rounded-lg border border-border">
                  <span className="text-primary font-semibold">Option A</span>
                  <p className="mt-1">{foundEpisode.choiceA.label}</p>
                </div>
                <div className="p-4 bg-accent/30 rounded-lg border border-border">
                  <span className="text-primary font-semibold">Option B</span>
                  <p className="mt-1">{foundEpisode.choiceB.label}</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default EpisodeDetail;
