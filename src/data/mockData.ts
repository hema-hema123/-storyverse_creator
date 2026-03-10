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

/* ------------------------------------------------------------------ */
/*  IMAGE POOL – cycled by shows so every card has a real thumbnail    */
/* ------------------------------------------------------------------ */
const images = [
  showFantasy,
  showRomance,
  showScifi,
  showMystery,
  glassGarden,
  showAdventure,
  showCrime,
  heroBanner,
  netflixBackground,
];
const img = (i: number) => images[i % images.length];

/* ------------------------------------------------------------------ */
/*  SHOWS  (20 series × 5-8 episodes each ≈ 112 content pieces)      */
/* ------------------------------------------------------------------ */
export const shows: Show[] = [
  /* ── 1  The Last Kingdom ─────────────────────────────────────────── */
  {
    id: "1",
    title: "The Last Kingdom",
    description:
      "A warrior's journey through a mystical realm where magic and steel collide. Follow Aldric as he discovers his true heritage and fights to save a kingdom on the brink of destruction.",
    image: img(0),
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
        characters: [
          "Aldric - The reluctant hero",
          "Elder Mira - Village sage",
          "Captain Thorne - Military leader",
        ],
        additionalElements:
          "Setting: Borderlands village\nTime: Medieval fantasy era\nMood: Mysterious, tense",
        isFinished: true,
        choiceA: { label: "Follow the Elder's advice", nextEpisodeId: "1-2" },
        choiceB: { label: "Join Captain Thorne's army", nextEpisodeId: "1-3" },
      },
      {
        id: "1-2",
        title: "The Ancient Path",
        number: 2,
        description: "Following the Elder's guidance leads to ancient secrets.",
        plot: "Aldric travels to the Temple of Forgotten Gods where the walls whisper prophecy...",
        characters: ["Aldric", "Elder Mira", "Temple Guardian"],
        additionalElements: "New location: Temple ruins",
        isFinished: true,
        choiceA: { label: "Decode the runes", nextEpisodeId: "1-4" },
        choiceB: { label: "Destroy the altar", nextEpisodeId: "1-5" },
      },
      {
        id: "1-3",
        title: "The Soldier's Way",
        number: 3,
        description: "Military training reveals unexpected allies and enemies.",
        plot: "At the fortress, Aldric begins his training and discovers a spy among the recruits...",
        characters: ["Aldric", "Captain Thorne", "Sera - Fellow recruit"],
        additionalElements: "New location: Royal Fortress",
        isFinished: false,
      },
      {
        id: "1-4",
        title: "Whispers of Stone",
        number: 4,
        description: "The runes unlock a map to the First Forge.",
        plot: "Hidden beneath the temple, an ancient map glows with silver light, revealing a path through the Shadowlands...",
        characters: ["Aldric", "Elder Mira", "The Cartographer"],
        additionalElements: "Artifact: Runic map\nMood: Awe, tension",
        isFinished: false,
      },
      {
        id: "1-5",
        title: "The Shattered Altar",
        number: 5,
        description: "Destroying the altar releases something far worse.",
        plot: "Cracks race across the stone and a darkness pours out, ancient and hungry...",
        characters: ["Aldric", "Shadow Entity", "Elder Mira"],
        additionalElements: "Mood: Horror, regret",
        isFinished: false,
      },
      {
        id: "1-6",
        title: "Blood & Iron",
        number: 6,
        description: "The kingdom prepares for an all-out siege.",
        plot: "Armies gather on the plains as Aldric must decide where his loyalties lie...",
        characters: ["Aldric", "Captain Thorne", "Queen Sera"],
        additionalElements: "Setting: Open battlefield\nMood: Epic, bittersweet",
        isFinished: false,
      },
    ],
  },

  /* ── 2  Sunset Promises ──────────────────────────────────────────── */
  {
    id: "2",
    title: "Sunset Promises",
    description:
      "Two strangers meet at a beach resort, their summer romance blossoming into something neither expected. But secrets from their pasts threaten to tear them apart.",
    image: img(1),
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
        isFinished: false,
      },
      {
        id: "2-2",
        title: "Tidal Confessions",
        number: 2,
        description: "A midnight walk on the shore reveals hidden truths.",
        plot: "The tide is low and the stars are out when Jack admits why he really came to the island...",
        characters: ["Maya", "Jack"],
        additionalElements: "Mood: Vulnerable, romantic",
        isFinished: false,
      },
      {
        id: "2-3",
        title: "Old Letters",
        number: 3,
        description: "Maya finds a box of letters addressed to someone who never left.",
        plot: "In the attic of the resort cottage, dust-covered envelopes tell a love story from decades ago...",
        characters: ["Maya", "Jack", "Resort Owner Rosa"],
        additionalElements: "Subplot: Parallel love story",
        isFinished: false,
      },
      {
        id: "2-4",
        title: "The Gallery Opening",
        number: 4,
        description: "Maya curates an impromptu art show that changes everything.",
        plot: "Local artists gather on the boardwalk for an evening of paint and music...",
        characters: ["Maya", "Jack", "Local artist Eli"],
        additionalElements: "Mood: Joyful, creative",
        isFinished: false,
      },
      {
        id: "2-5",
        title: "Storm Season",
        number: 5,
        description: "A tropical storm traps everyone indoors, forcing long-avoided conversations.",
        plot: "Rain hammers the windows as Maya and Jack finally face the truth...",
        characters: ["Maya", "Jack"],
        additionalElements: "Mood: Tense, emotional",
        isFinished: false,
      },
      {
        id: "2-6",
        title: "Departure Gate",
        number: 6,
        description: "Summer ends. The question: stay or go?",
        plot: "Suitcases line the lobby. A single boarding pass sits on the nightstand...",
        characters: ["Maya", "Jack", "Rosa"],
        additionalElements: "Mood: Bittersweet, hopeful",
        isFinished: false,
      },
    ],
  },

  /* ── 3  Neon Shadows ─────────────────────────────────────────────── */
  {
    id: "3",
    title: "Neon Shadows",
    description:
      "In a cyberpunk metropolis of 2157, a hacker uncovers a conspiracy that reaches the highest levels of corporate power. Trust no one. Question everything.",
    image: img(2),
    genre: "Sci-Fi",
    views: 15200,
    badge: "New Episode",
    episodes: [
      {
        id: "3-1",
        title: "Ghost in the System",
        number: 1,
        description: "Zero discovers an encrypted message that changes everything.",
        plot: "Rain falls on the neon-lit streets of Neo Tokyo as Zero intercepts a signal...",
        characters: [
          "Zero - Elite hacker",
          "Aria - AI companion",
          "Director Vance - Corporate villain",
        ],
        additionalElements:
          "Tech: Neural implants, holographic displays\nMood: Noir, paranoid",
        isFinished: false,
      },
      {
        id: "3-2",
        title: "The Firewall",
        number: 2,
        description: "Zero breaches the corporate mainframe and triggers a city-wide lockdown.",
        plot: "Every screen in Neo Tokyo flashes red as Zero realises the trap she triggered...",
        characters: ["Zero", "Aria", "Agent Koss"],
        additionalElements: "Mood: Frantic, claustrophobic",
        isFinished: false,
      },
      {
        id: "3-3",
        title: "Mirror Code",
        number: 3,
        description: "Aria discovers she's a copy of a deleted consciousness.",
        plot: "Deep in the data archives, Aria finds a ghost that looks exactly like her...",
        characters: ["Zero", "Aria", "Ghost-Aria"],
        additionalElements: "Theme: Identity, free will",
        isFinished: false,
      },
      {
        id: "3-4",
        title: "Blackout",
        number: 4,
        description: "The power grid goes dark. Someone wants Zero offline permanently.",
        plot: "Street by street the lights die. Zero navigates by memory alone...",
        characters: ["Zero", "Koss", "Underground faction leader Bolt"],
        additionalElements: "Mood: Survival horror",
        isFinished: false,
      },
      {
        id: "3-5",
        title: "Upload",
        number: 5,
        description: "Zero must choose: expose the truth or protect the ones she loves.",
        plot: "The upload key glows in her palm — one press and the world changes...",
        characters: ["Zero", "Aria", "Director Vance"],
        additionalElements: "Mood: High-stakes, emotional",
        isFinished: false,
      },
      {
        id: "3-6",
        title: "New Dawn",
        number: 6,
        description: "The aftermath of Zero's decision reshapes the city.",
        plot: "Daylight hits the streets for the first time in the series...",
        characters: ["Zero", "Aria", "Bolt"],
        additionalElements: "Mood: Hopeful, uncertain",
        isFinished: false,
      },
    ],
  },

  /* ── 4  Whispers in the Dark ─────────────────────────────────────── */
  {
    id: "4",
    title: "Whispers in the Dark",
    description:
      "A family moves into a Victorian mansion with a dark history. As strange events unfold, they realize they're not alone in the house.",
    image: img(3),
    genre: "Mystery",
    views: 8400,
    episodes: [
      {
        id: "4-1",
        title: "New Beginnings",
        number: 1,
        description: "The Hartley family arrives at their new home.",
        plot: "The old Victorian loomed against the gray sky, its windows like hollow eyes...",
        characters: [
          "Sarah Hartley - Mother",
          "Tom Hartley - Father",
          "Emma - Daughter, 12",
        ],
        additionalElements: "Setting: Isolated mansion\nAtmosphere: Gothic, unsettling",
        isFinished: false,
      },
      {
        id: "4-2",
        title: "The Locked Room",
        number: 2,
        description: "Emma hears music coming from a room that doesn't exist on the floor plan.",
        plot: "At 3 AM the melody begins — a lullaby Emma's grandmother used to sing...",
        characters: ["Emma", "Sarah", "Neighbour Agatha"],
        additionalElements: "Mood: Creepy, curious",
        isFinished: false,
      },
      {
        id: "4-3",
        title: "The Diary",
        number: 3,
        description: "Tom discovers a journal hidden inside the fireplace brickwork.",
        plot: "Soot-covered pages reveal entries from 1892, each more frantic than the last...",
        characters: ["Tom", "Sarah", "Historical figure: Adelaide"],
        additionalElements: "Subplot: Historical timeline",
        isFinished: false,
      },
      {
        id: "4-4",
        title: "Footsteps Above",
        number: 4,
        description: "The attic door opens on its own every night at midnight.",
        plot: "Sarah sets up a camera. What it captures cannot be explained...",
        characters: ["Sarah", "Tom", "Emma"],
        additionalElements: "Mood: Dread, paranoia",
        isFinished: false,
      },
      {
        id: "4-5",
        title: "The Mirror Room",
        number: 5,
        description: "Every mirror in the house shows a different version of the family.",
        plot: "Emma's reflection waves first. Then it speaks...",
        characters: ["Emma", "Mirror-Emma", "Sarah"],
        additionalElements: "Theme: Doppelgänger, identity",
        isFinished: false,
      },
      {
        id: "4-6",
        title: "The Reckoning",
        number: 6,
        description: "The family must confront the house's original sin to break free.",
        plot: "All the ghosts converge in the parlour for one final confrontation...",
        characters: ["Full Hartley family", "Adelaide's ghost"],
        additionalElements: "Mood: Cathartic, terrifying",
        isFinished: false,
      },
    ],
  },

  /* ── 5  The Relic Hunter ─────────────────────────────────────────── */
  {
    id: "5",
    title: "The Relic Hunter",
    description:
      "Dr. Elena Cross travels the world searching for legendary artifacts, racing against shadowy organizations who want the same treasures for darker purposes.",
    image: img(5),
    genre: "Adventure",
    views: 11300,
    badge: "Popular",
    episodes: [
      {
        id: "5-1",
        title: "The Map Fragment",
        number: 1,
        description: "A dying professor entrusts Elena with a mysterious map piece.",
        plot: "In the dusty archives of the British Museum a hand trembles as it passes the parchment...",
        characters: [
          "Dr. Elena Cross - Archaeologist",
          "Professor Whitmore",
          "Marcus Cole - Rival hunter",
        ],
        additionalElements: "Locations: London, Cairo\nArtifact: Piece of the Eternity Map",
        isFinished: false,
      },
      {
        id: "5-2",
        title: "Sandstorm",
        number: 2,
        description: "Elena's dig in the Sahara is interrupted by a wall of sand — and gunfire.",
        plot: "The desert reveals and conceals in equal measure...",
        characters: ["Elena", "Marcus Cole", "Local guide Yara"],
        additionalElements: "Location: Sahara\nMood: Action, discovery",
        isFinished: false,
      },
      {
        id: "5-3",
        title: "Sunken City",
        number: 3,
        description: "Sonar readings point to ruins beneath the Mediterranean.",
        plot: "Fifty metres below the surface, columns rise from the seabed...",
        characters: ["Elena", "Dive specialist Kai", "Marcus"],
        additionalElements: "Location: Mediterranean Sea\nMood: Wonder, danger",
        isFinished: false,
      },
      {
        id: "5-4",
        title: "The Auction",
        number: 4,
        description: "A black-market auction in Monaco has the second map piece.",
        plot: "Crystal chandeliers and hushed bids mask the violence waiting outside...",
        characters: ["Elena", "Marcus", "Collector Madame Lin"],
        additionalElements: "Location: Monaco\nMood: Glamorous, tense",
        isFinished: false,
      },
      {
        id: "5-5",
        title: "Temple of Echoes",
        number: 5,
        description: "The completed map leads to a temple hidden in the Himalayas.",
        plot: "Ice and stone and a door that hasn't opened in three thousand years...",
        characters: ["Elena", "Yara", "Ancient guardian construct"],
        additionalElements: "Location: Nepal\nMood: Epic, spiritual",
        isFinished: false,
      },
      {
        id: "5-6",
        title: "Eternity's Edge",
        number: 6,
        description: "Elena faces the ultimate choice: claim the artifact or destroy it.",
        plot: "The relic pulses with light. Marcus aims a gun. The temple shakes...",
        characters: ["Elena", "Marcus", "Yara"],
        additionalElements: "Mood: Climactic, emotional",
        isFinished: false,
      },
    ],
  },

  /* ── 6  Cold Case Files ──────────────────────────────────────────── */
  {
    id: "6",
    title: "Cold Case Files",
    description:
      "Detective Maria Santos reopens unsolved cases that everyone else has forgotten. Each case reveals secrets that powerful people want to stay buried.",
    image: img(6),
    genre: "Crime",
    views: 10100,
    episodes: [
      {
        id: "6-1",
        title: "The Missing Heiress",
        number: 1,
        description: "A socialite vanished 20 years ago. Now new evidence emerges.",
        plot: "The file had gathered dust for two decades until a DNA match lit up the database...",
        characters: ["Det. Maria Santos", "Chief Williams", "The mysterious informant"],
        additionalElements: "Time: Present day\nCold case year: 2006",
        isFinished: false,
      },
      {
        id: "6-2",
        title: "The Dockside Witness",
        number: 2,
        description: "A witness who recanted his statement 15 years ago wants to talk.",
        plot: "Rain-slicked docks and a nervous man in a trench coat...",
        characters: ["Maria", "Witness Frank", "Chief Williams"],
        additionalElements: "Mood: Noir, suspense",
        isFinished: false,
      },
      {
        id: "6-3",
        title: "Blood Ledger",
        number: 3,
        description: "Accounting records from a defunct nightclub reveal a money trail.",
        plot: "Numbers don't lie, but the people behind them do...",
        characters: ["Maria", "Forensic accountant Priya", "Club owner's son Leo"],
        additionalElements: "Theme: Corruption",
        isFinished: false,
      },
      {
        id: "6-4",
        title: "The Second Victim",
        number: 4,
        description: "Another disappearance — same pattern, 10 years apart.",
        plot: "Maria pins two photos side-by-side on the board. The resemblance is uncanny...",
        characters: ["Maria", "Victim's family", "FBI liaison"],
        additionalElements: "Mood: Urgent, dark",
        isFinished: false,
      },
      {
        id: "6-5",
        title: "Confession Booth",
        number: 5,
        description: "A deathbed confession points to someone inside the department.",
        plot: "The hospital room is quiet except for beeping monitors and a whispered name...",
        characters: ["Maria", "Retired officer Dale", "Chief Williams"],
        additionalElements: "Mood: Betrayal, shock",
        isFinished: false,
      },
      {
        id: "6-6",
        title: "Verdict",
        number: 6,
        description: "Maria presents her case. Not everyone wants the truth to come out.",
        plot: "The courtroom doors open and cameras flash...",
        characters: ["Maria", "Defence attorney Voss", "The heiress — alive"],
        additionalElements: "Mood: Triumphant, bittersweet",
        isFinished: false,
      },
    ],
  },

  /* ── 7  Signal to Orbit ──────────────────────────────────────────── */
  {
    id: "7",
    title: "Signal to Orbit",
    description:
      "A scrappy film crew documents the first off-world music festival and uncovers a story that could change Earth forever.",
    image: img(7),
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
        isFinished: false,
      },
      {
        id: "7-2",
        title: "Soundcheck",
        number: 2,
        description: "The first rehearsal in zero-G doesn't go as planned.",
        plot: "Instruments float and feedback loops echo through the dome...",
        characters: ["Rina", "Myles", "Headliner DJ Pulse"],
        additionalElements: "Mood: Fun, chaotic",
        isFinished: false,
      },
      {
        id: "7-3",
        title: "Transmission",
        number: 3,
        description: "A rogue signal interrupts every frequency on the station.",
        plot: "Static resolves into a voice speaking a language no database can identify...",
        characters: ["Rina", "Kira", "Station AI: Celeste"],
        additionalElements: "Mood: Eerie, curious",
        isFinished: false,
      },
      {
        id: "7-4",
        title: "The Encore",
        number: 4,
        description: "The festival must go on — even as the signal grows louder.",
        plot: "Crowds gather under the dome while Rina films the sky...",
        characters: ["Rina", "Myles", "DJ Pulse", "Kira"],
        additionalElements: "Mood: Defiant, electric",
        isFinished: false,
      },
      {
        id: "7-5",
        title: "First Contact",
        number: 5,
        description: "The signal source reveals itself. Music is the key.",
        plot: "A shape appears on the horizon of the moon — beautiful and impossible...",
        characters: ["Full crew", "The Visitor"],
        additionalElements: "Mood: Awe, wonder",
        isFinished: false,
      },
    ],
  },

  /* ── 8  Echo Lake ────────────────────────────────────────────────── */
  {
    id: "8",
    title: "Echo Lake",
    description:
      "A documentary team returns to a coastal town and discovers a legend that is more real than anyone believed.",
    image: img(8),
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
        isFinished: false,
      },
      {
        id: "8-2",
        title: "The Fog Wall",
        number: 2,
        description: "A dense fog rolls in and the GPS stops working.",
        plot: "The trees disappear behind a white curtain. The crew can only move forward...",
        characters: ["Mara", "Devin", "Local fisherman Hank"],
        additionalElements: "Mood: Isolation, dread",
        isFinished: false,
      },
      {
        id: "8-3",
        title: "Drowned Bells",
        number: 3,
        description: "Church bells ring from beneath the lake. There is no church.",
        plot: "Sonar reveals structures 40 feet below the surface...",
        characters: ["Mara", "Devin", "Diver specialist Cal"],
        additionalElements: "Mood: Wonder, fear",
        isFinished: false,
      },
      {
        id: "8-4",
        title: "Old Town",
        number: 4,
        description:
          "A town that was supposed to be demolished in 1954 still stands — underwater.",
        plot: "Cal's camera captures streets, storefronts, and something moving...",
        characters: ["Mara", "Cal", "Historian Dr. Liang"],
        additionalElements: "Theme: Lost history",
        isFinished: false,
      },
      {
        id: "8-5",
        title: "Surfacing",
        number: 5,
        description: "The lake begins to recede. The town is rising.",
        plot: "Rooftops emerge from the water as the crew scrambles to document everything...",
        characters: ["Full crew", "Townspeople descendants"],
        additionalElements: "Mood: Awe, urgency",
        isFinished: false,
      },
      {
        id: "8-6",
        title: "The Keeper",
        number: 6,
        description: "Someone has been maintaining the submerged town for decades.",
        plot: "Lights glow in the old town hall. Someone is home...",
        characters: ["Mara", "Devin", "The Keeper"],
        additionalElements: "Mood: Revelation, peace",
        isFinished: false,
      },
    ],
  },

  /* ── 9  Glass Garden ─────────────────────────────────────────────── */
  {
    id: "9",
    title: "Glass Garden",
    description:
      "An indie animator builds a surreal universe, but the characters begin speaking back.",
    image: img(4),
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
        isFinished: false,
      },
      {
        id: "9-2",
        title: "Colour Bleed",
        number: 2,
        description: "Rune escapes the sketchbook and enters Nova's apartment.",
        plot: "Paint drips off the page and onto the floor, forming footprints...",
        characters: ["Nova", "Rune"],
        additionalElements: "Mood: Whimsical, unsettling",
        isFinished: false,
      },
      {
        id: "9-3",
        title: "The Gallery World",
        number: 3,
        description: "Nova steps through a painting and enters Rune's dimension.",
        plot: "Walls stretch into landscapes and the sky is watercolour...",
        characters: ["Nova", "Rune", "The Curator"],
        additionalElements: "Mood: Psychedelic, wondrous",
        isFinished: false,
      },
      {
        id: "9-4",
        title: "Eraser",
        number: 4,
        description: "A force is deleting parts of Rune's world. Nova must draw faster.",
        plot: "White patches eat the horizon as Nova sketches frantically...",
        characters: ["Nova", "Rune", "The Eraser"],
        additionalElements: "Mood: Urgent, creative",
        isFinished: false,
      },
      {
        id: "9-5",
        title: "Final Frame",
        number: 5,
        description:
          "Nova must decide: close the sketchbook forever or merge the worlds.",
        plot: "The ink is running low. One last stroke will decide everything...",
        characters: ["Nova", "Rune", "The Curator"],
        additionalElements: "Mood: Bittersweet, profound",
        isFinished: false,
      },
    ],
  },

  /* ── 10  Threaded ────────────────────────────────────────────────── */
  {
    id: "10",
    title: "Threaded",
    description:
      "A fashion creator documents the origin stories behind iconic streetwear drops.",
    image: img(1),
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
        isFinished: false,
      },
      {
        id: "10-2",
        title: "Drop Day",
        number: 2,
        description: "The chaos and beauty of a limited-edition streetwear release.",
        plot: "Queues wrap around the block. Resellers and fans collide...",
        characters: ["Jules", "Fans", "Reseller King"],
        additionalElements: "Mood: Hype, conflict",
        isFinished: false,
      },
      {
        id: "10-3",
        title: "The Sample Room",
        number: 3,
        description: "Behind closed doors, prototypes tell stories that never shipped.",
        plot: "Shelves of rejected designs reveal the ideas that almost changed streetwear...",
        characters: ["Jules", "Mentor Ayo"],
        additionalElements: "Mood: Reflective, inspiring",
        isFinished: false,
      },
      {
        id: "10-4",
        title: "Cross-Culture",
        number: 4,
        description: "Jules travels to Tokyo to see how the designs were remixed overseas.",
        plot: "Harajuku streets pulse with colour and reinvention...",
        characters: ["Jules", "Tokyo collaborator Miko"],
        additionalElements: "Location: Tokyo\nMood: Vibrant",
        isFinished: false,
      },
      {
        id: "10-5",
        title: "Legacy Stitch",
        number: 5,
        description: "The final collection pays homage to every story told.",
        plot: "Models walk a runway built in the original neighbourhood...",
        characters: ["Jules", "Tariq", "Community"],
        additionalElements: "Mood: Celebratory, emotional",
        isFinished: false,
      },
    ],
  },

  /* ── 11  Ember Protocol ──────────────────────────────────────────── */
  {
    id: "11",
    title: "Ember Protocol",
    description:
      "A firefighter-turned-arson investigator discovers a pattern linking blazes across three states — and the trail leads back to her own family.",
    image: img(6),
    genre: "Crime",
    views: 9300,
    badge: "Trending",
    episodes: [
      {
        id: "11-1", title: "Ignition Point", number: 1,
        description: "A warehouse fire reveals accelerant signatures that match a cold case.",
        plot: "Ash still swirls as Jess kneels beside a V-pattern that shouldn't exist...",
        characters: ["Jess Morrow - Investigator", "Fire Chief Hale"],
        additionalElements: "Setting: Industrial district\nMood: Gritty", isFinished: false,
      },
      {
        id: "11-2", title: "Flashback", number: 2,
        description: "Home-video footage from Jess's childhood shows a fire nobody reported.",
        plot: "The camcorder flickers with images of smoke rising from the barn...",
        characters: ["Jess", "Her brother Kyle", "Mother (on tape)"],
        additionalElements: "Theme: Family secrets", isFinished: false,
      },
      {
        id: "11-3", title: "The Accelerant", number: 3,
        description: "Lab results identify a custom chemical compound — military-grade.",
        plot: "The spectrometer readout stops the lab tech mid-sentence...",
        characters: ["Jess", "Lab tech Samir", "FBI agent Novak"],
        additionalElements: "Mood: Procedural, tense", isFinished: false,
      },
      {
        id: "11-4", title: "Controlled Burn", number: 4,
        description: "Jess goes undercover at a survivalist expo to identify the supplier.",
        plot: "Camouflage tents and conspiracy pamphlets line the fairground...",
        characters: ["Jess", "Supplier 'Torch'", "Novak (remote support)"],
        additionalElements: "Mood: Undercover thriller", isFinished: false,
      },
      {
        id: "11-5", title: "Smoke & Mirrors", number: 5,
        description: "Kyle confesses — but his story doesn't add up.",
        plot: "In the interrogation room, Kyle's alibi crumbles and rebuilds itself...",
        characters: ["Jess", "Kyle", "Defence attorney"],
        additionalElements: "Mood: Emotional, conflicted", isFinished: false,
      },
      {
        id: "11-6", title: "Burn Notice", number: 6,
        description: "The final fire is already set. Jess has minutes to find it.",
        plot: "A countdown text arrives. Jess sprints through the city...",
        characters: ["Jess", "Kyle", "Torch"],
        additionalElements: "Mood: Climactic, explosive", isFinished: false,
      },
    ],
  },

  /* ── 12  Parallel Lives ──────────────────────────────────────────── */
  {
    id: "12",
    title: "Parallel Lives",
    description:
      "Every morning Lena wakes in a different version of her life. Same city, different choices. She must figure out which timeline is real before they collapse.",
    image: img(2),
    genre: "Sci-Fi",
    views: 10800,
    episodes: [
      {
        id: "12-1", title: "Monday A", number: 1,
        description: "Lena is a surgeon. Then she blinks and she's a bartender.",
        plot: "The scalpel is in her hand one second, a cocktail shaker the next...",
        characters: ["Lena Park", "Colleague Dr. Ames", "Bar regular Mick"],
        additionalElements: "Theme: Choice, identity\nMood: Disorienting", isFinished: false,
      },
      {
        id: "12-2", title: "The Constant", number: 2,
        description: "One person appears in every timeline — and they recognise Lena.",
        plot: "A stranger on the train says, 'You're jumping again, aren't you?'...",
        characters: ["Lena", "The Constant — Sam"],
        additionalElements: "Mood: Mystery, hope", isFinished: false,
      },
      {
        id: "12-3", title: "Entropy", number: 3,
        description: "The timelines start bleeding into each other.",
        plot: "Lena's surgeon hands shake as bar glasses appear on the operating tray...",
        characters: ["Lena", "Sam", "Dr. Ames (glitching)"],
        additionalElements: "Mood: Unstable, surreal", isFinished: false,
      },
      {
        id: "12-4", title: "The Anchor", number: 4,
        description: "Sam reveals the device that caused the split — and that Lena built it.",
        plot: "A small brass compass with too many needles sits in Lena's childhood bedroom...",
        characters: ["Lena", "Sam", "Young Lena (memory)"],
        additionalElements: "Theme: Responsibility", isFinished: false,
      },
      {
        id: "12-5", title: "Convergence", number: 5,
        description: "All timelines collapse into one moment. Lena must choose who to be.",
        plot: "Every version of Lena stands in the same room, facing the same mirror...",
        characters: ["All Lenas", "Sam"],
        additionalElements: "Mood: Profound, emotional", isFinished: false,
      },
    ],
  },

  /* ── 13  Vine & Thorn ────────────────────────────────────────────── */
  {
    id: "13",
    title: "Vine & Thorn",
    description:
      "A botanical researcher discovers a sentient plant network beneath the Amazon that is slowly awakening — and it has demands.",
    image: img(0),
    genre: "Fantasy",
    views: 7400,
    episodes: [
      {
        id: "13-1", title: "Root System", number: 1,
        description: "Soil samples sing. Dr. Okafor thinks her equipment is broken.",
        plot: "The spectrograph shows patterns that look like language...",
        characters: ["Dr. Amara Okafor", "Field assistant Leo", "The Network (voice)"],
        additionalElements: "Setting: Amazon rainforest\nMood: Awe", isFinished: false,
      },
      {
        id: "13-2", title: "First Word", number: 2,
        description: "The network speaks its first intelligible word: 'Return.'",
        plot: "Every plant in the lab turns toward Amara simultaneously...",
        characters: ["Amara", "Leo", "University dean (remote call)"],
        additionalElements: "Mood: Unnerving", isFinished: false,
      },
      {
        id: "13-3", title: "Symbiosis", number: 3,
        description: "The network offers a trade: knowledge for protection.",
        plot: "Amara touches a vine and sees 10,000 years of Earth's history in seconds...",
        characters: ["Amara", "The Network"],
        additionalElements: "Mood: Transcendent", isFinished: false,
      },
      {
        id: "13-4", title: "Logging Road", number: 4,
        description: "A logging company threatens the forest — and the network fights back.",
        plot: "Machinery stalls. Roots rise through asphalt...",
        characters: ["Amara", "Leo", "Logging foreman Torres"],
        additionalElements: "Theme: Environmentalism\nMood: Action", isFinished: false,
      },
      {
        id: "13-5", title: "Bloom", number: 5,
        description: "The network blooms globally. Amara must decide its fate.",
        plot: "Flowers erupt in every city. Beautiful — and terrifying...",
        characters: ["Amara", "The Network", "World leaders (broadcast)"],
        additionalElements: "Mood: Epic, philosophical", isFinished: false,
      },
    ],
  },

  /* ── 14  Midnight Frequency ──────────────────────────────────────── */
  {
    id: "14",
    title: "Midnight Frequency",
    description:
      "A college radio DJ receives anonymous calls that predict events before they happen. She becomes the most listened-to voice in the city — and the most hunted.",
    image: img(3),
    genre: "Mystery",
    views: 8900,
    badge: "Popular",
    episodes: [
      {
        id: "14-1", title: "Dead Air", number: 1,
        description: "The first call comes at 12:01 AM. By 12:15 it comes true.",
        plot: "Static crackles, then a whisper predicts a bridge closure. Minutes later, sirens...",
        characters: ["DJ Zara Cole", "Producer Benji", "Anonymous Caller"],
        additionalElements: "Setting: University radio station\nMood: Intriguing", isFinished: false,
      },
      {
        id: "14-2", title: "Signal Boost", number: 2,
        description: "Ratings explode. A media company wants the show — and the caller.",
        plot: "Zara's inbox fills with offers, threats, and theories...",
        characters: ["Zara", "Media exec Rhonda", "Benji"],
        additionalElements: "Theme: Fame vs. truth", isFinished: false,
      },
      {
        id: "14-3", title: "Playback", number: 3,
        description: "Zara records the calls and finds a second voice hidden beneath the first.",
        plot: "Audio analysis reveals a whisper under the whisper...",
        characters: ["Zara", "Audio forensics student Tomas", "Benji"],
        additionalElements: "Mood: Paranoia", isFinished: false,
      },
      {
        id: "14-4", title: "Dial Tone", number: 4,
        description: "The caller goes silent. The predictions keep happening anyway.",
        plot: "The phone lines are dead but every prediction comes true, one by one...",
        characters: ["Zara", "Detective Hale", "Benji"],
        additionalElements: "Mood: Dread, helplessness", isFinished: false,
      },
      {
        id: "14-5", title: "Live Broadcast", number: 5,
        description: "Zara goes live with the truth. The caller is listening.",
        plot: "Every radio in the city tunes in. Then the lights go out...",
        characters: ["Zara", "The Caller (revealed)", "City audience"],
        additionalElements: "Mood: Climactic", isFinished: false,
      },
    ],
  },

  /* ── 15  Salt & Smoke ────────────────────────────────────────────── */
  {
    id: "15",
    title: "Salt & Smoke",
    description:
      "A travel-food series following chef Noor as she traces her grandmother's recipes across five countries, discovering family secrets in every kitchen.",
    image: img(5),
    genre: "Documentary",
    views: 7200,
    episodes: [
      {
        id: "15-1", title: "The Recipe Box", number: 1,
        description: "Noor inherits a tin box of hand-written recipes with coded notes.",
        plot: "Flour-dusted cards with instructions and cryptic initials...",
        characters: ["Chef Noor Haddad", "Grandmother (flashback)", "Mother Layla"],
        additionalElements: "Setting: Family kitchen\nMood: Warm, curious", isFinished: false,
      },
      {
        id: "15-2", title: "Beirut Bread", number: 2,
        description: "The first recipe leads to a bakery in Beirut that shouldn't still exist.",
        plot: "The oven hasn't cooled in sixty years...",
        characters: ["Noor", "Baker Hassan"],
        additionalElements: "Location: Beirut\nMood: Nostalgic", isFinished: false,
      },
      {
        id: "15-3", title: "Saffron Trail", number: 3,
        description: "A spice merchant in Istanbul holds the next piece of the puzzle.",
        plot: "The bazaar hums with colour and Noor recognises a scent from childhood...",
        characters: ["Noor", "Merchant Elif"],
        additionalElements: "Location: Istanbul\nMood: Sensory, vibrant", isFinished: false,
      },
      {
        id: "15-4", title: "The Secret Ingredient", number: 4,
        description: "In Marseille, Noor learns her grandmother had a second family.",
        plot: "A woman answers the door and has grandmother's eyes...",
        characters: ["Noor", "Half-aunt Claudette"],
        additionalElements: "Location: Marseille\nTheme: Identity", isFinished: false,
      },
      {
        id: "15-5", title: "Last Course", number: 5,
        description: "Noor cooks the final recipe for both sides of her family.",
        plot: "Two families, one table, one dish that tells the whole story...",
        characters: ["Noor", "Layla", "Claudette", "Extended family"],
        additionalElements: "Mood: Healing, cathartic", isFinished: false,
      },
    ],
  },

  /* ── 16  Ironclad ────────────────────────────────────────────────── */
  {
    id: "16",
    title: "Ironclad",
    description:
      "A rust-belt mechanic discovers blueprints for an impossible engine inside a junked car. Building it attracts attention from people who thought they'd buried the technology forever.",
    image: img(7),
    genre: "Adventure",
    views: 6800,
    episodes: [
      {
        id: "16-1", title: "Junkyard Find", number: 1,
        description: "Ray pulls a 1970 Challenger and finds plans welded inside the chassis.",
        plot: "Sparks fly as the grinder reveals a steel compartment nobody was supposed to find...",
        characters: ["Ray Delgado - Mechanic", "Shop owner Gus"],
        additionalElements: "Setting: Midwest junkyard\nMood: Blue collar, mysterious", isFinished: false,
      },
      {
        id: "16-2", title: "First Spark", number: 2,
        description: "The prototype engine starts — and the lights in three counties flicker.",
        plot: "A low hum builds until the garage shakes...",
        characters: ["Ray", "Electrical engineer Dana"],
        additionalElements: "Mood: Excitement, danger", isFinished: false,
      },
      {
        id: "16-3", title: "Knock on the Door", number: 3,
        description: "A woman from the Department of Energy wants to see the engine. Now.",
        plot: "Black SUVs line the street outside Ray's shop...",
        characters: ["Ray", "Agent Wells", "Gus"],
        additionalElements: "Theme: Little guy vs. system", isFinished: false,
      },
      {
        id: "16-4", title: "Road Test", number: 4,
        description: "Ray installs the engine in the Challenger and hits the open highway.",
        plot: "The needle passes 200 and keeps climbing. The fuel gauge hasn't moved...",
        characters: ["Ray", "Dana", "Pursuing agents"],
        additionalElements: "Mood: Freedom, speed", isFinished: false,
      },
      {
        id: "16-5", title: "Patent War", number: 5,
        description: "A corporation claims ownership. Ray has 48 hours to prove otherwise.",
        plot: "Legal documents vs. grease-stained blueprints...",
        characters: ["Ray", "Lawyer Carmen", "CEO Hargrove"],
        additionalElements: "Mood: Tense, David vs. Goliath", isFinished: false,
      },
      {
        id: "16-6", title: "Open Source", number: 6,
        description: "Ray leaks the blueprints to the world. The genie is out of the bottle.",
        plot: "One upload. A million downloads. The world shifts...",
        characters: ["Ray", "Dana", "Global montage"],
        additionalElements: "Mood: Triumphant, uncertain", isFinished: false,
      },
    ],
  },

  /* ── 17  Lovesick Algorithm ──────────────────────────────────────── */
  {
    id: "17",
    title: "Lovesick Algorithm",
    description:
      "A dating-app engineer accidentally matches herself with the one person the algorithm says is her worst match. Naturally, sparks fly.",
    image: img(1),
    genre: "Romance",
    views: 11900,
    badge: "Trending",
    episodes: [
      {
        id: "17-1", title: "Bug Report", number: 1,
        description: "Priya's own profile glitches and matches her with Owen — 3% compatibility.",
        plot: "The notification pops up during her TED talk on algorithmic love...",
        characters: ["Priya Sen - Engineer", "Owen Park - Bookshop owner"],
        additionalElements: "Setting: San Francisco\nMood: Witty, charming", isFinished: false,
      },
      {
        id: "17-2", title: "First Coffee", number: 2,
        description: "Against all logic, Priya agrees to meet Owen. The coffee is terrible. The conversation isn't.",
        plot: "Rain drums on the café window as they argue about everything...",
        characters: ["Priya", "Owen"],
        additionalElements: "Mood: Banter, chemistry", isFinished: false,
      },
      {
        id: "17-3", title: "Data vs. Heart", number: 3,
        description: "Priya runs their conversations through her model. The numbers say stop. She doesn't.",
        plot: "Spreadsheets and butterflies don't mix — or do they?...",
        characters: ["Priya", "Owen", "Best friend Meera"],
        additionalElements: "Theme: Logic vs. emotion", isFinished: false,
      },
      {
        id: "17-4", title: "The Demo", number: 4,
        description: "Priya's company showcases the algorithm on live TV — and uses her match as the example.",
        plot: "The whole country sees their 3% score. Owen watches from the bookshop...",
        characters: ["Priya", "Owen", "CEO Marcus"],
        additionalElements: "Mood: Cringe, turning point", isFinished: false,
      },
      {
        id: "17-5", title: "Rewrite", number: 5,
        description: "Priya rewrites the algorithm to prove love can't be computed.",
        plot: "One final commit message: 'Removed certainty.'...",
        characters: ["Priya", "Owen", "Meera"],
        additionalElements: "Mood: Romantic, satisfying", isFinished: false,
      },
    ],
  },

  /* ── 18  Cage Match ──────────────────────────────────────────────── */
  {
    id: "18",
    title: "Cage Match",
    description:
      "An underground MMA fighter is offered a shot at the legitimate title — but her past in the illegal circuit could destroy everything.",
    image: img(6),
    genre: "Crime",
    views: 8700,
    episodes: [
      {
        id: "18-1", title: "First Round", number: 1,
        description: "Dani wins her last underground bout and gets scouted by a real promoter.",
        plot: "Blood on the mat, crowd roaring, and a business card slid under the cage...",
        characters: ["Dani Cruz - Fighter", "Promoter Al", "Trainer Ghost"],
        additionalElements: "Setting: Basement fight ring\nMood: Raw", isFinished: false,
      },
      {
        id: "18-2", title: "Training Camp", number: 2,
        description: "Dani enters a legitimate gym and must unlearn every dirty trick.",
        plot: "The heavy bag doesn't fight back — but it doesn't cheat either...",
        characters: ["Dani", "Coach Rivera", "Sparring partner Lex"],
        additionalElements: "Mood: Discipline, growth", isFinished: false,
      },
      {
        id: "18-3", title: "Weigh-In", number: 3,
        description: "The press conference turns ugly when someone leaks Dani's record.",
        plot: "Cameras flash. A reporter holds up a photo from the underground...",
        characters: ["Dani", "Al", "Reporter"],
        additionalElements: "Mood: Public shame", isFinished: false,
      },
      {
        id: "18-4", title: "Corner Work", number: 4,
        description: "Ghost from the underground resurfaces — he wants a cut or he talks.",
        plot: "A text at 2 AM: 'Remember who made you.'...",
        characters: ["Dani", "Ghost", "Coach Rivera"],
        additionalElements: "Theme: Loyalty, extortion", isFinished: false,
      },
      {
        id: "18-5", title: "Title Fight", number: 5,
        description: "Everything comes down to five rounds under the lights.",
        plot: "The arena is sold out. Dani touches gloves. The bell rings...",
        characters: ["Dani", "Champion Suki", "Coach Rivera"],
        additionalElements: "Mood: Epic, cathartic", isFinished: false,
      },
    ],
  },

  /* ── 19  The Cartographers ───────────────────────────────────────── */
  {
    id: "19",
    title: "The Cartographers",
    description:
      "Three siblings inherit a map shop — and discover their late father hid portals to real places inside hand-drawn maps.",
    image: img(0),
    genre: "Fantasy",
    views: 9100,
    episodes: [
      {
        id: "19-1", title: "Paper Doors", number: 1,
        description: "The eldest sibling unfolds a map and steps into 1920s Paris.",
        plot: "The shop bell rings, the map glows, and the floor drops away...",
        characters: ["Kade - Eldest", "Lina - Middle", "Joss - Youngest"],
        additionalElements: "Locations: Map shop, Paris 1920\nMood: Magical", isFinished: false,
      },
      {
        id: "19-2", title: "Ink Boundaries", number: 2,
        description: "Lina discovers that staying too long in a map changes it permanently.",
        plot: "A coffee stain on the parchment becomes a lake in the map-world...",
        characters: ["Lina", "Map-world guide Celeste"],
        additionalElements: "Theme: Consequence", isFinished: false,
      },
      {
        id: "19-3", title: "The Collector", number: 3,
        description: "A rival map dealer wants the portals for profit.",
        plot: "An auction house. A stolen map. A bidding war in whispers...",
        characters: ["Kade", "Collector Harlow", "Joss"],
        additionalElements: "Mood: Thriller, heist", isFinished: false,
      },
      {
        id: "19-4", title: "Uncharted", number: 4,
        description: "Joss draws an original map — and creates a world that never existed.",
        plot: "The pencil moves and mountains rise from nothing...",
        characters: ["Joss", "Lina", "New-world inhabitants"],
        additionalElements: "Theme: Creation, responsibility", isFinished: false,
      },
      {
        id: "19-5", title: "Fold", number: 5,
        description: "The maps are tearing. The siblings must close the portals — from the inside.",
        plot: "Paper worlds crumble as the three race to find their father's final map...",
        characters: ["Kade", "Lina", "Joss", "Father (message)"],
        additionalElements: "Mood: Urgent, emotional", isFinished: false,
      },
      {
        id: "19-6", title: "Legend", number: 6,
        description: "The father's last map leads home — and reveals why he hid the portals.",
        plot: "A map of the shop itself, drawn with love and a warning...",
        characters: ["All siblings", "Father (spirit)"],
        additionalElements: "Mood: Healing, wonder", isFinished: false,
      },
    ],
  },

  /* ── 20  Bandwidth ───────────────────────────────────────────────── */
  {
    id: "20",
    title: "Bandwidth",
    description:
      "A live-streamer with 10 million followers discovers that her viewers can vote to control her real life for 24 hours. What starts as content becomes a survival game.",
    image: img(8),
    genre: "Sci-Fi",
    views: 13400,
    badge: "New Episode",
    episodes: [
      {
        id: "20-1", title: "Go Live", number: 1,
        description: "Sierra accepts the 24-hour challenge. The chat makes the first demand.",
        plot: "The donate button becomes a command console. '10K and she has to…'",
        characters: ["Sierra Jin - Streamer", "Moderator Kai", "The Chat"],
        additionalElements: "Setting: Her apartment, then city\nMood: Fun turning dark", isFinished: false,
      },
      {
        id: "20-2", title: "Poll Results", number: 2,
        description: "The votes escalate. Sierra can't tell if the chat is joking anymore.",
        plot: "Option A: Apologise to your ex on camera. Option B: Break into your old school...",
        characters: ["Sierra", "Kai", "Ex-boyfriend Mateo"],
        additionalElements: "Theme: Mob mentality", isFinished: false,
      },
      {
        id: "20-3", title: "Donation Goal", number: 3,
        description: "A mysterious donor pledges $100K — with one terrifying condition.",
        plot: "The number climbs. The condition is simple: don't hang up...",
        characters: ["Sierra", "Anonymous donor 'Architect'", "Kai"],
        additionalElements: "Mood: Thriller, cat-and-mouse", isFinished: false,
      },
      {
        id: "20-4", title: "Offline", number: 4,
        description: "Sierra tries to end the stream. The stream won't end.",
        plot: "Every device in her apartment goes live. The viewer count doubles...",
        characters: ["Sierra", "Tech friend Rowan", "The Architect"],
        additionalElements: "Mood: Horror, helplessness", isFinished: false,
      },
      {
        id: "20-5", title: "Counter-Stream", number: 5,
        description: "Sierra turns the audience against the Architect. The viewers become her army.",
        plot: "A hashtag trends worldwide. The hunter becomes the hunted...",
        characters: ["Sierra", "Kai", "Global audience"],
        additionalElements: "Mood: Empowering, tense", isFinished: false,
      },
      {
        id: "20-6", title: "Sign Off", number: 6,
        description: "Sierra ends the stream — for real this time. But the world is watching.",
        plot: "One final frame: her face, no filter, no chat. Just her...",
        characters: ["Sierra"],
        additionalElements: "Mood: Quiet, defiant", isFinished: false,
      },
    ],
  },
];

/* ------------------------------------------------------------------ */
/*  TRENDING & NICHE TOPICS                                           */
/* ------------------------------------------------------------------ */
export const trendingTopics = [
  "AI Dystopia",
  "Time Loop",
  "Found Family",
  "Slow Burn Romance",
  "Heist Gone Wrong",
  "Dark Academia",
  "Multiverse",
  "Unreliable Narrator",
];

export const nicheTopics: Record<string, string[]> = {
  Fantasy: ["Dragon Riders", "Court Intrigue", "Prophecy Subversion", "Magic Systems"],
  Romance: ["Enemies to Lovers", "Second Chance", "Fake Dating", "Grumpy x Sunshine"],
  "Sci-Fi": ["First Contact", "Space Opera", "Cyberpunk Noir", "AI Sentience"],
  Mystery: ["Locked Room", "Amateur Sleuth", "Cozy Mystery", "Psychological Thriller"],
  Adventure: ["Lost Civilizations", "Treasure Hunt", "Survival", "Expedition Gone Wrong"],
  Crime: ["Police Procedural", "Vigilante Justice", "True Crime Inspired", "Cold Cases"],
  Documentary: ["Creator Diaries", "Behind the Lens", "Origin Stories", "Street Culture"],
};

/* ------------------------------------------------------------------ */
/*  NOTIFICATIONS                                                     */
/* ------------------------------------------------------------------ */
export interface Notification {
  id: string;
  type: "follow" | "suggestion" | "milestone";
  title: string;
  description: string;
  time: string;
  image?: string;
}

export const notifications: Notification[] = [
  { id: "1", type: "follow", title: "New Follower", description: "StoryMaster42 started following you", time: "2 hours ago" },
  { id: "2", type: "suggestion", title: "Suggested Creator", description: "Check out NightWriter's fantasy series", time: "5 hours ago" },
  { id: "3", type: "milestone", title: "Milestone Reached!", description: "Your story hit 10,000 views!", time: "1 day ago" },
  { id: "4", type: "follow", title: "New Follower", description: "DreamWeaver started following you", time: "2 days ago" },
];

/* ------------------------------------------------------------------ */
/*  CREATOR STATS  (updated for 20 shows / 112 episodes)              */
/* ------------------------------------------------------------------ */
export const creatorStats = {
  totalViews: 189_700,
  totalStories: 20,
  followers: 3842,
  primaryNiche: "Fantasy",
  secondaryNiche: "Sci-Fi",
  endingPreferences: {
    "The Last Kingdom": { endingA: 65, endingB: 35 },
    "Neon Shadows": { endingA: 48, endingB: 52 },
  } as Record<string, { endingA: number; endingB: number }>,
  topStories: [
    { title: "Neon Shadows", views: 15200 },
    { title: "Bandwidth", views: 13400 },
    { title: "The Last Kingdom", views: 12500 },
    { title: "Lovesick Algorithm", views: 11900 },
    { title: "The Relic Hunter", views: 11300 },
  ],
};
