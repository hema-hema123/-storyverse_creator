import { Link } from "react-router-dom";
import { ArrowLeft, TrendingUp, Users, BookOpen, Eye, BarChart3, Sparkles } from "lucide-react";
import { creatorStats, trendingTopics, nicheTopics } from "@/data/mockData";
import Navbar from "@/components/Navbar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

const CreatorStats = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="pt-10 px-4 md:px-12 pb-20">
        {/* Header */}
        <div className="rounded-3xl border border-border bg-card/80 backdrop-blur p-6 md:p-10 mb-8">
          <div className="flex items-center gap-4">
            <Link
              to="/browse"
              className="p-2 rounded-full hover:bg-accent transition-colors duration-300"
            >
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">StoryVerse Studio</p>
              <h1 className="text-2xl md:text-3xl font-semibold">Insights for Your Series</h1>
            </div>
          </div>

          {/* Top Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
            {[
              {
                icon: Eye,
                label: "Total Views",
                value: creatorStats.totalViews.toLocaleString(),
              },
              {
                icon: BookOpen,
                label: "Episodes Created",
                value: creatorStats.totalStories,
              },
              {
                icon: Users,
                label: "Followers",
                value: creatorStats.followers.toLocaleString(),
              },
              {
                icon: BarChart3,
                label: "Main Genre",
                value: creatorStats.primaryNiche,
              },
            ].map((stat) => (
              <Card
                key={stat.label}
                className="bg-background/60 border-border hover:shadow-lg hover:shadow-primary/40 hover:-translate-y-1 transition-all duration-300"
              >
                <CardContent className="pt-6">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-primary/20 hover:bg-primary/30 transition-colors">
                      <stat.icon className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold">{stat.value}</p>
                      <p className="text-muted-foreground text-sm">{stat.label}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Top Series & Creative Tips */}
        <div className="grid md:grid-cols-[1.2fr_0.8fr] gap-8">
          <Card className="bg-card border-border hover:shadow-lg hover:shadow-primary/40 hover:-translate-y-1 transition-all duration-300">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-primary" />
                Your Most Loved Episodes
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {creatorStats.topStories.map((story, index) => (
                <div key={story.title} className="flex items-center gap-4">
                  <span className="font-display text-2xl text-muted-foreground w-8">{index + 1}</span>
                  <div className="flex-1">
                    <p className="font-medium">{story.title}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <Progress
                        value={(story.views / creatorStats.topStories[0].views) * 100}
                        className="h-2 flex-1 rounded-full bg-muted/50 overflow-hidden shadow-inner"
                      />
                      <span className="text-muted-foreground text-sm">{story.views.toLocaleString()} views</span>
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          <div className="space-y-4">
            <Card className="bg-card border-border hover:shadow-lg hover:shadow-primary/40 hover:-translate-y-1 transition-all duration-300">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-primary" />
                  Creative Tips
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm text-muted-foreground">
                <p>Cliffhangers keep your viewers coming back — try ending one episode with a question.</p>
                <p>Post a teaser reel a day before launch to build excitement.</p>
                <p>Evening posts around 7–9 PM usually get the most attention.</p>
              </CardContent>
            </Card>

            <Card className="bg-card border-border hover:shadow-lg hover:shadow-primary/40 hover:-translate-y-1 transition-all duration-300">
              <CardHeader>
                <CardTitle>Audience Favorites</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {Object.entries(creatorStats.endingPreferences).map(([story, prefs]) => (
                  <div key={story}>
                    <p className="font-medium mb-2">{story}</p>
                    <div className="flex gap-2">
                      <div
                        className="h-8 bg-primary rounded-l flex items-center justify-center text-sm font-medium"
                        style={{ width: `${prefs.endingA}%` }}
                      >
                        A: {prefs.endingA}%
                      </div>
                      <div
                        className="h-8 bg-muted rounded-r flex items-center justify-center text-sm font-medium"
                        style={{ width: `${prefs.endingB}%` }}
                      >
                        B: {prefs.endingB}%
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Trending Topics */}
        <div className="mt-10">
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-primary" />
            Inspiration: What's Buzzing
          </h2>
          <div className="flex flex-wrap gap-3">
            {trendingTopics.map((topic) => (
              <span
                key={topic}
                className="px-4 py-2 bg-card rounded-full border border-border cursor-pointer transition-all duration-300 hover:bg-primary/25 hover:text-primary hover:shadow-md hover:shadow-primary/30"
              >
                {topic}
              </span>
            ))}
          </div>
        </div>

        <div className="mt-8">
          <h2 className="text-xl font-semibold mb-4">
            Trending in {creatorStats.primaryNiche}
          </h2>
          <div className="flex flex-wrap gap-3">
            {nicheTopics[creatorStats.primaryNiche]?.map((topic) => (
              <span
                key={topic}
                className="px-4 py-2 bg-primary/15 text-primary rounded-full cursor-pointer transition-all duration-300 hover:bg-primary/25 hover:shadow-sm hover:shadow-primary/30"
              >
                {topic}
              </span>
            ))}
          </div>
        </div>

        <div className="mt-6">
          <h3 className="text-lg font-medium mb-3 text-muted-foreground">
            Bonus Inspiration from {creatorStats.secondaryNiche}
          </h3>
          <div className="flex flex-wrap gap-3">
            {nicheTopics[creatorStats.secondaryNiche]?.map((topic) => (
              <span
                key={topic}
                className="px-4 py-2 bg-muted rounded-full cursor-pointer transition-all duration-300 hover:bg-accent hover:shadow-sm hover:shadow-primary/30"
              >
                {topic}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreatorStats;
