import showFantasy from "@/assets/show-fantasy.jpg";
import showRomance from "@/assets/show-romance.jpg";
import showScifi from "@/assets/show-scifi.jpg";
import showMystery from "@/assets/show-mystery.jpg";
import glassGarden from "@/assets/glass-garden.jpg";
import showAdventure from "@/assets/show-adventure.jpg";
import showCrime from "@/assets/show-crime.jpg";
import heroBanner from "@/assets/hero-banner.jpg";
import netflixBackground from "@/assets/netflix-background.jpg";

export interface Episode {
  id: string;
  title: string;
  number: number;
  description: string;
  plot: string;
  characters: string[];
  additionalElements: string;
  isFinished: boolean;
  choiceA?: { label: string; nextEpisodeId: string };
  choiceB?: { label: string; nextEpisodeId: string };
}

export interface Show {
  id: string;
  title: string;
  description: string;
  image: string;
  genre: string;
  episodes: Episode[];
  views: number;
  badge?: string;
}

export const shows: Show[] = [
  {
    id: "1",
    title: "The Last Kingdom",
    description: "A warrior's journey through a mystical realm where magic and steel collide. Follow Aldric as he discovers his true heritage and fights to save a kingdom on the brink of destruction.",
    image: showFantasy,
    genre: "Fantasy",
    views: 12500,
    badge: "Trending",
    episodes: [
      {
        id: "1-1",
        title: "The Awakening",
        number: 1,
        description: "Aldric discovers his hidden powers during a village attack.",
        plot: "The story begins in a quiet village at the edge of the Shadowlands. Aldric, a young blacksmith's apprentice, has always felt different. When mysterious creatures attack, he unleashes powers he never knew he had...",
        characters: ["Aldric - The reluctant hero", "Elder Mira - Village sage", "Captain Thorne - Military leader"],
        additionalElements: "Setting: Borderlands village\nTime: Medieval fantasy era\nMood: Mysterious, tense",
        isFinished: true,
        choiceA: { label: "Follow the Elder's advice", nextEpisodeId: "1-2" },
        choiceB: { label: "Join Captain Thorne's army", nextEpisodeId: "1-3" }
      },
      {
        id: "1-2",
        title: "The Ancient Path",
        number: 2,
        description: "Following the Elder's guidance leads to ancient secrets.",
        plot: "Aldric travels to the Temple of Forgotten Gods...",
        characters: ["Aldric", "Elder Mira", "Temple Guardian"],
        additionalElements: "New location: Temple ruins",
        isFinished: false
      },
      {
        id: "1-3",
        title: "The Soldier's Way",
        number: 3,
        description: "Military training reveals unexpected allies and enemies.",
        plot: "At the fortress, Aldric begins his training...",
        characters: ["Aldric", "Captain Thorne", "Sera - Fellow recruit"],
        additionalElements: "New location: Royal Fortress",
        isFinished: false
      }
    ]
  },
  {
    id: "2",
    title: "Sunset Promises",
    description: "Two strangers meet at a beach resort, their summer romance blossoming into something neither expected. But secrets from their pasts threaten to tear them apart.",
    image: showRomance,
    genre: "Romance",
    views: 9800,
    episodes: [
      {
        id: "2-1",
        title: "First Glance",
        number: 1,
        description: "Maya and Jack's eyes meet across a crowded beach bar.",
        plot: "The salty breeze carries the sound of laughter as Maya settles into her vacation...",
        characters: ["Maya - Art curator on break", "Jack - Mystery writer"],
        additionalElements: "Setting: Coastal resort\nSeason: Summer",
        isFinished: false
      }
    ]
  },
  {
    id: "3",
    title: "Neon Shadows",
    description: "In a cyberpunk metropolis of 2157, a hacker uncovers a conspiracy that reaches the highest levels of corporate power. Trust no one. Question everything.",
    image: showScifi,
    genre: "Sci-Fi",
    views: 15200,
    badge: "New Episode",
    episodes: [
      {
        id: "3-1",
        title: "Ghost in the System",
        number: 1,
        description: "Zero discovers an encrypted message that changes everything.",
        plot: "Rain falls on the neon-lit streets of Neo Tokyo...",
        characters: ["Zero - Elite hacker", "Aria - AI companion", "Director Vance - Corporate villain"],
        additionalElements: "Tech: Neural implants, holographic displays\nMood: Noir, paranoid",
        isFinished: false
      }
    ]
  },
  {
    id: "4",
    title: "Whispers in the Dark",
    description: "A family moves into a Victorian mansion with a dark history. As strange events unfold, they realize they're not alone in the house.",
    image: showMystery,
    genre: "Mystery",
    views: 8400,
    episodes: [
      {
        id: "4-1",
        title: "New Beginnings",
        number: 1,
        description: "The Hartley family arrives at their new home.",
        plot: "The old Victorian loomed against the gray sky...",
        characters: ["Sarah Hartley - Mother", "Tom Hartley - Father", "Emma - Daughter, 12"],
        additionalElements: "Setting: Isolated mansion\nAtmosphere: Gothic, unsettling",
        isFinished: false
      }
    ]
  },
  {
    id: "5",
    title: "The Relic Hunter",
    description: "Dr. Elena Cross travels the world searching for legendary artifacts, racing against shadowy organizations who want the same treasures for darker purposes.",
    image: showAdventure,
    genre: "Adventure",
    views: 11300,
    badge: "Popular",
    episodes: [
      {
        id: "5-1",
        title: "The Map Fragment",
        number: 1,
        description: "A dying professor entrusts Elena with a mysterious map piece.",
        plot: "In the dusty archives of the British Museum...",
        characters: ["Dr. Elena Cross - Archaeologist", "Professor Whitmore", "Marcus Cole - Rival hunter"],
        additionalElements: "Locations: London, Cairo\nArtifact: Piece of the Eternity Map",
        isFinished: false
      }
    ]
  },
  {
    id: "6",
    title: "Cold Case Files",
    description: "Detective Maria Santos reopens unsolved cases that everyone else has forgotten. Each case reveals secrets that powerful people want to stay buried.",
    image: showCrime,
    genre: "Crime",
    views: 10100,
    episodes: [
      {
        id: "6-1",
        title: "The Missing Heiress",
        number: 1,
        description: "A socialite vanished 20 years ago. Now new evidence emerges.",
        plot: "The file had gathered dust for two decades...",
        characters: ["Det. Maria Santos", "Chief Williams", "The mysterious informant"],
        additionalElements: "Time: Present day\nCold case year: 2006",
        isFinished: false
      }
    ]
  },
  {
    id: "7",
    title: "Signal to Orbit",
    description: "A scrappy film crew documents the first off-world music festival and uncovers a story that could change Earth forever.",
    image: heroBanner,
    genre: "Sci-Fi",
    views: 7600,
    badge: "Trending",
    episodes: [
      {
        id: "7-1",
        title: "Launch Window",
        number: 1,
        description: "The crew boards a cargo ship bound for Luna.",
        plot: "The docks hum with engines as the crew prepares to leave Earth...",
        characters: ["Rina - Director", "Myles - Sound engineer", "Kira - Pilot"],
        additionalElements: "Setting: Lunar orbital port\nMood: Electric, hopeful",
        isFinished: false
      }
    ]
  },
  {
    id: "8",
    title: "Echo Lake",
    description: "A documentary team returns to a coastal town and discovers a legend that is more real than anyone believed.",
    image: netflixBackground,
    genre: "Mystery",
    views: 6900,
    episodes: [
      {
        id: "8-1",
        title: "The Still Water",
        number: 1,
        description: "A strange sound pulls the crew into the forest at night.",
        plot: "Waves lap the shore as the team sets up their first night shoot...",
        characters: ["Mara - Producer", "Devin - Cinematographer"],
        additionalElements: "Setting: Pacific coast\nMood: Eerie, quiet",
        isFinished: false
      }
    ]
  },
  {
    id: "9",
    title: "Glass Garden",
    description: "An indie animator builds a surreal universe, but the characters begin speaking back.",
    image: glassGarden,
    genre: "Fantasy",
    views: 8200,
    badge: "New",
    episodes: [
      {
        id: "9-1",
        title: "Living Sketches",
        number: 1,
        description: "A sketchbook comes alive during a late-night session.",
        plot: "Ink bleeds across the page as a new character appears...",
        characters: ["Nova - Animator", "Rune - The sketch"],
        additionalElements: "Medium: 2D/3D hybrid\nMood: Dreamlike",
        isFinished: false
      }
    ]
  },
  {
    id: "10",
    title: "Threaded",
    description: "A fashion creator documents the origin stories behind iconic streetwear drops.",
    image: showRomance,
    genre: "Documentary",
    views: 6100,
    episodes: [
      {
        id: "10-1",
        title: "First Stitch",
        number: 1,
        description: "A creator revisits the community that started it all.",
        plot: "The camera follows a late-night cut-and-sew session...",
        characters: ["Jules - Designer", "Tariq - Historian"],
        additionalElements: "Setting: Urban studio\nMood: Gritty, hopeful",
        isFinished: false
      }
    ]
  }
];

export const trendingTopics = [
  "AI Dystopia",
  "Time Loop",
  "Found Family",
  "Slow Burn Romance",
  "Heist Gone Wrong",
  "Dark Academia",
  "Multiverse",
  "Unreliable Narrator"
];

export const nicheTopics: Record<string, string[]> = {
  Fantasy: ["Dragon Riders", "Court Intrigue", "Prophecy Subversion", "Magic Systems"],
  Romance: ["Enemies to Lovers", "Second Chance", "Fake Dating", "Grumpy x Sunshine"],
  "Sci-Fi": ["First Contact", "Space Opera", "Cyberpunk Noir", "AI Sentience"],
  Mystery: ["Locked Room", "Amateur Sleuth", "Cozy Mystery", "Psychological Thriller"],
  Adventure: ["Lost Civilizations", "Treasure Hunt", "Survival", "Expedition Gone Wrong"],
  Crime: ["Police Procedural", "Vigilante Justice", "True Crime Inspired", "Cold Cases"],
  Documentary: ["Creator Diaries", "Behind the Lens", "Origin Stories", "Street Culture"]
};

export interface Notification {
  id: string;
  type: "follow" | "suggestion" | "milestone";
  title: string;
  description: string;
  time: string;
  image?: string;
}

export const notifications: Notification[] = [
  {
    id: "1",
    type: "follow",
    title: "New Follower",
    description: "StoryMaster42 started following you",
    time: "2 hours ago"
  },
  {
    id: "2",
    type: "suggestion",
    title: "Suggested Creator",
    description: "Check out NightWriter's fantasy series",
    time: "5 hours ago"
  },
  {
    id: "3",
    type: "milestone",
    title: "Milestone Reached!",
    description: "Your story hit 10,000 views!",
    time: "1 day ago"
  },
  {
    id: "4",
    type: "follow",
    title: "New Follower",
    description: "DreamWeaver started following you",
    time: "2 days ago"
  }
];

export const creatorStats = {
  totalViews: 67300,
  totalStories: 10,
  followers: 1247,
  primaryNiche: "Fantasy",
  secondaryNiche: "Sci-Fi",
  endingPreferences: {
    "The Last Kingdom": { endingA: 65, endingB: 35 },
    "Neon Shadows": { endingA: 48, endingB: 52 }
  },
  topStories: [
    { title: "Neon Shadows", views: 15200 },
    { title: "The Last Kingdom", views: 12500 },
    { title: "The Relic Hunter", views: 11300 }
  ]
};
