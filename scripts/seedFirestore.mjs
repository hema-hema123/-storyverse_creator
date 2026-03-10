/**
 * Firestore Seed Script
 * ---------------------
 * Pushes all mock data (20 shows, 112 episodes, creator stats, topics) into
 * your Firestore project so the real-time onSnapshot listeners have data.
 *
 * Usage:
 *   cd storyverse-creator
 *   node scripts/seedFirestore.mjs
 *
 * Uses the Firebase client SDK with your .env config — no service account needed.
 */

import { readFileSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";
import { initializeApp } from "firebase/app";
import { getFirestore, doc, setDoc, collection } from "firebase/firestore";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

const __dirname = dirname(fileURLToPath(import.meta.url));

/* ── Load .env manually (no dotenv dependency needed) ──────────── */
const envPath = resolve(__dirname, "../.env");
const envLines = readFileSync(envPath, "utf-8").split("\n");
const env = {};
for (const line of envLines) {
  const match = line.match(/^([^=]+)=(.*)$/);
  if (match) env[match[1].trim()] = match[2].trim();
}

const firebaseConfig = {
  apiKey: env.VITE_FIREBASE_API_KEY,
  authDomain: env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: env.VITE_FIREBASE_APP_ID,
};

if (!firebaseConfig.projectId) {
  console.error("❌  Missing VITE_FIREBASE_PROJECT_ID in .env");
  process.exit(1);
}

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

/* ── Sign in before seeding ────────────────────────────────────── */
const email = process.env.SEED_EMAIL || env.SEED_EMAIL;
const password = process.env.SEED_PASSWORD || env.SEED_PASSWORD;

if (!email || !password) {
  console.error(
    "❌  Provide your Firebase login credentials:\n" +
    "   SEED_EMAIL=you@example.com SEED_PASSWORD=yourpass node scripts/seedFirestore.mjs\n" +
    "   (or add SEED_EMAIL and SEED_PASSWORD to your .env file)"
  );
  process.exit(1);
}

/* ── Image placeholders (Firestore doesn't need actual file imports) */
const images = [
  "/assets/show-fantasy.jpg",
  "/assets/show-romance.jpg",
  "/assets/show-scifi.jpg",
  "/assets/show-mystery.jpg",
  "/assets/glass-garden.jpg",
  "/assets/show-adventure.jpg",
  "/assets/show-crime.jpg",
  "/assets/hero-banner.jpg",
  "/assets/netflix-background.jpg",
];
const img = (i) => images[i % images.length];

/* ── Full show data (mirrors mockData.ts) ──────────────────────── */
const shows = [
  {
    id: "1", title: "The Last Kingdom", genre: "Fantasy", views: 12500, badge: "Trending", image: img(0),
    description: "A warrior's journey through a mystical realm where magic and steel collide.",
    episodes: [
      { id:"1-1", title:"The Awakening", number:1, description:"Aldric discovers his hidden powers during a village attack.", plot:"The story begins in a quiet village...", characters:["Aldric","Elder Mira","Captain Thorne"], additionalElements:"Setting: Borderlands village", isFinished:true, choiceA:{label:"Follow the Elder's advice",nextEpisodeId:"1-2"}, choiceB:{label:"Join Captain Thorne's army",nextEpisodeId:"1-3"} },
      { id:"1-2", title:"The Ancient Path", number:2, description:"Following the Elder's guidance leads to ancient secrets.", plot:"Aldric travels to the Temple of Forgotten Gods...", characters:["Aldric","Elder Mira","Temple Guardian"], additionalElements:"New location: Temple ruins", isFinished:true, choiceA:{label:"Decode the runes",nextEpisodeId:"1-4"}, choiceB:{label:"Destroy the altar",nextEpisodeId:"1-5"} },
      { id:"1-3", title:"The Soldier's Way", number:3, description:"Military training reveals unexpected allies.", plot:"At the fortress, Aldric begins his training...", characters:["Aldric","Captain Thorne","Sera"], additionalElements:"Royal Fortress", isFinished:false },
      { id:"1-4", title:"Whispers of Stone", number:4, description:"The runes unlock a map to the First Forge.", plot:"An ancient map glows with silver light...", characters:["Aldric","Elder Mira","The Cartographer"], additionalElements:"Artifact: Runic map", isFinished:false },
      { id:"1-5", title:"The Shattered Altar", number:5, description:"Destroying the altar releases something worse.", plot:"Cracks race across the stone...", characters:["Aldric","Shadow Entity","Elder Mira"], additionalElements:"Mood: Horror", isFinished:false },
      { id:"1-6", title:"Blood & Iron", number:6, description:"The kingdom prepares for siege.", plot:"Armies gather on the plains...", characters:["Aldric","Captain Thorne","Queen Sera"], additionalElements:"Mood: Epic", isFinished:false },
    ],
  },
  {
    id: "2", title: "Sunset Promises", genre: "Romance", views: 9800, image: img(1),
    description: "Two strangers meet at a beach resort, their summer romance blossoming into something neither expected.",
    episodes: [
      { id:"2-1", title:"First Glance", number:1, description:"Maya and Jack meet at a beach bar.", plot:"The salty breeze carries laughter...", characters:["Maya","Jack"], additionalElements:"Setting: Coastal resort", isFinished:false },
      { id:"2-2", title:"Tidal Confessions", number:2, description:"A midnight walk reveals hidden truths.", plot:"Stars are out when Jack admits...", characters:["Maya","Jack"], additionalElements:"Mood: Romantic", isFinished:false },
      { id:"2-3", title:"Old Letters", number:3, description:"Maya finds letters addressed to someone who never left.", plot:"Dust-covered envelopes in the attic...", characters:["Maya","Jack","Rosa"], additionalElements:"Parallel love story", isFinished:false },
      { id:"2-4", title:"The Gallery Opening", number:4, description:"An impromptu art show changes everything.", plot:"Paint and music on the boardwalk...", characters:["Maya","Jack","Eli"], additionalElements:"Mood: Joyful", isFinished:false },
      { id:"2-5", title:"Storm Season", number:5, description:"A tropical storm forces long-avoided conversations.", plot:"Rain hammers the windows...", characters:["Maya","Jack"], additionalElements:"Mood: Tense", isFinished:false },
      { id:"2-6", title:"Departure Gate", number:6, description:"Summer ends. Stay or go?", plot:"A boarding pass on the nightstand...", characters:["Maya","Jack","Rosa"], additionalElements:"Mood: Bittersweet", isFinished:false },
    ],
  },
  {
    id: "3", title: "Neon Shadows", genre: "Sci-Fi", views: 15200, badge: "New Episode", image: img(2),
    description: "In a cyberpunk metropolis of 2157, a hacker uncovers a conspiracy.",
    episodes: [
      { id:"3-1", title:"Ghost in the System", number:1, description:"Zero discovers an encrypted message.", plot:"Rain on neon streets...", characters:["Zero","Aria","Director Vance"], additionalElements:"Mood: Noir", isFinished:false },
      { id:"3-2", title:"The Firewall", number:2, description:"Zero triggers a city-wide lockdown.", plot:"Every screen flashes red...", characters:["Zero","Aria","Koss"], additionalElements:"Mood: Frantic", isFinished:false },
      { id:"3-3", title:"Mirror Code", number:3, description:"Aria discovers she's a copy.", plot:"A ghost in the archives...", characters:["Zero","Aria","Ghost-Aria"], additionalElements:"Theme: Identity", isFinished:false },
      { id:"3-4", title:"Blackout", number:4, description:"The power grid goes dark.", plot:"Street by street the lights die...", characters:["Zero","Koss","Bolt"], additionalElements:"Mood: Survival", isFinished:false },
      { id:"3-5", title:"Upload", number:5, description:"Expose the truth or protect loved ones.", plot:"The upload key glows...", characters:["Zero","Aria","Vance"], additionalElements:"Mood: High-stakes", isFinished:false },
      { id:"3-6", title:"New Dawn", number:6, description:"The aftermath reshapes the city.", plot:"Daylight hits the streets...", characters:["Zero","Aria","Bolt"], additionalElements:"Mood: Hopeful", isFinished:false },
    ],
  },
  {
    id: "4", title: "Whispers in the Dark", genre: "Mystery", views: 8400, image: img(3),
    description: "A family moves into a Victorian mansion with a dark history.",
    episodes: [
      { id:"4-1", title:"New Beginnings", number:1, description:"The Hartley family arrives.", plot:"The Victorian loomed against gray sky...", characters:["Sarah","Tom","Emma"], additionalElements:"Gothic atmosphere", isFinished:false },
      { id:"4-2", title:"The Locked Room", number:2, description:"Music from a room not on the floor plan.", plot:"At 3 AM the melody begins...", characters:["Emma","Sarah","Agatha"], additionalElements:"Mood: Creepy", isFinished:false },
      { id:"4-3", title:"The Diary", number:3, description:"A journal hidden in the fireplace.", plot:"Soot-covered pages from 1892...", characters:["Tom","Sarah","Adelaide"], additionalElements:"Historical subplot", isFinished:false },
      { id:"4-4", title:"Footsteps Above", number:4, description:"The attic door opens every midnight.", plot:"A camera captures the unexplained...", characters:["Sarah","Tom","Emma"], additionalElements:"Mood: Dread", isFinished:false },
      { id:"4-5", title:"The Mirror Room", number:5, description:"Mirrors show different versions of the family.", plot:"Emma's reflection waves first...", characters:["Emma","Mirror-Emma","Sarah"], additionalElements:"Doppelgänger theme", isFinished:false },
      { id:"4-6", title:"The Reckoning", number:6, description:"Confront the house's original sin.", plot:"All ghosts converge in the parlour...", characters:["Full Hartley family","Adelaide's ghost"], additionalElements:"Mood: Cathartic", isFinished:false },
    ],
  },
  {
    id: "5", title: "The Relic Hunter", genre: "Adventure", views: 11300, badge: "Popular", image: img(5),
    description: "Dr. Elena Cross searches for legendary artifacts across the world.",
    episodes: [
      { id:"5-1", title:"The Map Fragment", number:1, description:"A dying professor entrusts Elena with a map piece.", plot:"Dusty archives of the British Museum...", characters:["Elena","Prof. Whitmore","Marcus Cole"], additionalElements:"London, Cairo", isFinished:false },
      { id:"5-2", title:"Sandstorm", number:2, description:"A Sahara dig interrupted by gunfire.", plot:"The desert reveals and conceals...", characters:["Elena","Marcus","Yara"], additionalElements:"Mood: Action", isFinished:false },
      { id:"5-3", title:"Sunken City", number:3, description:"Ruins beneath the Mediterranean.", plot:"Columns rise from the seabed...", characters:["Elena","Kai","Marcus"], additionalElements:"Mood: Wonder", isFinished:false },
      { id:"5-4", title:"The Auction", number:4, description:"Black-market auction in Monaco.", plot:"Chandeliers and hushed bids...", characters:["Elena","Marcus","Madame Lin"], additionalElements:"Mood: Glamorous", isFinished:false },
      { id:"5-5", title:"Temple of Echoes", number:5, description:"A temple hidden in the Himalayas.", plot:"A door unopened for 3000 years...", characters:["Elena","Yara","Guardian"], additionalElements:"Mood: Epic", isFinished:false },
      { id:"5-6", title:"Eternity's Edge", number:6, description:"Claim the artifact or destroy it.", plot:"The relic pulses with light...", characters:["Elena","Marcus","Yara"], additionalElements:"Mood: Climactic", isFinished:false },
    ],
  },
  {
    id: "6", title: "Cold Case Files", genre: "Crime", views: 10100, image: img(6),
    description: "Detective Maria Santos reopens unsolved cases.",
    episodes: [
      { id:"6-1", title:"The Missing Heiress", number:1, description:"New evidence in a 20-year-old disappearance.", plot:"DNA match lights up the database...", characters:["Maria","Chief Williams","Informant"], additionalElements:"Cold case year: 2006", isFinished:false },
      { id:"6-2", title:"The Dockside Witness", number:2, description:"A recanted witness wants to talk.", plot:"Rain-slicked docks...", characters:["Maria","Frank","Williams"], additionalElements:"Mood: Noir", isFinished:false },
      { id:"6-3", title:"Blood Ledger", number:3, description:"Nightclub records reveal a money trail.", plot:"Numbers don't lie...", characters:["Maria","Priya","Leo"], additionalElements:"Corruption theme", isFinished:false },
      { id:"6-4", title:"The Second Victim", number:4, description:"Same pattern, 10 years apart.", plot:"Two photos side-by-side...", characters:["Maria","Victim's family","FBI"], additionalElements:"Mood: Urgent", isFinished:false },
      { id:"6-5", title:"Confession Booth", number:5, description:"Deathbed confession points inside the department.", plot:"Beeping monitors and a whispered name...", characters:["Maria","Dale","Williams"], additionalElements:"Mood: Betrayal", isFinished:false },
      { id:"6-6", title:"Verdict", number:6, description:"Maria presents her case.", plot:"Courtroom doors open...", characters:["Maria","Voss","The heiress — alive"], additionalElements:"Mood: Triumphant", isFinished:false },
    ],
  },
  {
    id: "7", title: "Signal to Orbit", genre: "Sci-Fi", views: 7600, badge: "Trending", image: img(7),
    description: "A film crew documents the first off-world music festival.",
    episodes: [
      { id:"7-1", title:"Launch Window", number:1, description:"The crew boards a cargo ship to Luna.", plot:"Engines hum at the docks...", characters:["Rina","Myles","Kira"], additionalElements:"Mood: Electric", isFinished:false },
      { id:"7-2", title:"Soundcheck", number:2, description:"First rehearsal in zero-G fails.", plot:"Instruments float...", characters:["Rina","Myles","DJ Pulse"], additionalElements:"Mood: Chaotic", isFinished:false },
      { id:"7-3", title:"Transmission", number:3, description:"A rogue signal interrupts all frequencies.", plot:"Static resolves into a voice...", characters:["Rina","Kira","Celeste"], additionalElements:"Mood: Eerie", isFinished:false },
      { id:"7-4", title:"The Encore", number:4, description:"Festival continues as signal grows.", plot:"Crowds under the dome...", characters:["Rina","Myles","DJ Pulse","Kira"], additionalElements:"Mood: Defiant", isFinished:false },
      { id:"7-5", title:"First Contact", number:5, description:"Music is the key.", plot:"A shape on the lunar horizon...", characters:["Full crew","The Visitor"], additionalElements:"Mood: Awe", isFinished:false },
    ],
  },
  {
    id: "8", title: "Echo Lake", genre: "Mystery", views: 6900, image: img(8),
    description: "A documentary team discovers a legend more real than believed.",
    episodes: [
      { id:"8-1", title:"The Still Water", number:1, description:"Strange sounds in the forest.", plot:"Waves lap the shore...", characters:["Mara","Devin"], additionalElements:"Mood: Eerie", isFinished:false },
      { id:"8-2", title:"The Fog Wall", number:2, description:"GPS stops working in dense fog.", plot:"Trees disappear...", characters:["Mara","Devin","Hank"], additionalElements:"Mood: Isolation", isFinished:false },
      { id:"8-3", title:"Drowned Bells", number:3, description:"Church bells from beneath the lake.", plot:"Sonar reveals structures...", characters:["Mara","Devin","Cal"], additionalElements:"Mood: Wonder", isFinished:false },
      { id:"8-4", title:"Old Town", number:4, description:"A town underwater since 1954.", plot:"Cal's camera captures streets...", characters:["Mara","Cal","Dr. Liang"], additionalElements:"Lost history", isFinished:false },
      { id:"8-5", title:"Surfacing", number:5, description:"The lake recedes. The town rises.", plot:"Rooftops emerge...", characters:["Full crew","Descendants"], additionalElements:"Mood: Awe", isFinished:false },
      { id:"8-6", title:"The Keeper", number:6, description:"Someone maintained the town for decades.", plot:"Lights glow in the old town hall...", characters:["Mara","Devin","The Keeper"], additionalElements:"Mood: Revelation", isFinished:false },
    ],
  },
  {
    id: "9", title: "Glass Garden", genre: "Fantasy", views: 8200, badge: "New", image: img(4),
    description: "An animator's characters begin speaking back.",
    episodes: [
      { id:"9-1", title:"Living Sketches", number:1, description:"A sketchbook comes alive.", plot:"Ink bleeds across the page...", characters:["Nova","Rune"], additionalElements:"Mood: Dreamlike", isFinished:false },
      { id:"9-2", title:"Colour Bleed", number:2, description:"Rune escapes the sketchbook.", plot:"Paint forms footprints...", characters:["Nova","Rune"], additionalElements:"Mood: Whimsical", isFinished:false },
      { id:"9-3", title:"The Gallery World", number:3, description:"Nova enters Rune's dimension.", plot:"The sky is watercolour...", characters:["Nova","Rune","The Curator"], additionalElements:"Mood: Wondrous", isFinished:false },
      { id:"9-4", title:"Eraser", number:4, description:"A force deletes Rune's world.", plot:"White patches eat the horizon...", characters:["Nova","Rune","The Eraser"], additionalElements:"Mood: Urgent", isFinished:false },
      { id:"9-5", title:"Final Frame", number:5, description:"Close the book or merge worlds.", plot:"Ink running low...", characters:["Nova","Rune","The Curator"], additionalElements:"Mood: Bittersweet", isFinished:false },
    ],
  },
  {
    id: "10", title: "Threaded", genre: "Documentary", views: 6100, image: img(1),
    description: "Origin stories behind iconic streetwear drops.",
    episodes: [
      { id:"10-1", title:"First Stitch", number:1, description:"Revisiting the community that started it all.", plot:"Late-night cut-and-sew session...", characters:["Jules","Tariq"], additionalElements:"Mood: Gritty", isFinished:false },
      { id:"10-2", title:"Drop Day", number:2, description:"Chaos of a limited release.", plot:"Queues wrap around the block...", characters:["Jules","Fans","Reseller King"], additionalElements:"Mood: Hype", isFinished:false },
      { id:"10-3", title:"The Sample Room", number:3, description:"Prototypes that never shipped.", plot:"Shelves of rejected designs...", characters:["Jules","Mentor Ayo"], additionalElements:"Mood: Reflective", isFinished:false },
      { id:"10-4", title:"Cross-Culture", number:4, description:"Designs remixed in Tokyo.", plot:"Harajuku streets pulse...", characters:["Jules","Miko"], additionalElements:"Mood: Vibrant", isFinished:false },
      { id:"10-5", title:"Legacy Stitch", number:5, description:"Final collection pays homage.", plot:"Runway in the neighbourhood...", characters:["Jules","Tariq","Community"], additionalElements:"Mood: Celebratory", isFinished:false },
    ],
  },
  {
    id: "11", title: "Ember Protocol", genre: "Crime", views: 9300, badge: "Trending", image: img(6),
    description: "An arson investigator discovers a pattern linking blazes to her own family.",
    episodes: [
      { id:"11-1", title:"Ignition Point", number:1, description:"Warehouse fire matches a cold case.", plot:"Ash swirls...", characters:["Jess Morrow","Chief Hale"], additionalElements:"Mood: Gritty", isFinished:false },
      { id:"11-2", title:"Flashback", number:2, description:"Childhood footage shows an unreported fire.", plot:"Camcorder flickers...", characters:["Jess","Kyle","Mother"], additionalElements:"Family secrets", isFinished:false },
      { id:"11-3", title:"The Accelerant", number:3, description:"Military-grade chemical identified.", plot:"Spectrometer readout...", characters:["Jess","Samir","Novak"], additionalElements:"Mood: Tense", isFinished:false },
      { id:"11-4", title:"Controlled Burn", number:4, description:"Undercover at a survivalist expo.", plot:"Camouflage tents...", characters:["Jess","Torch","Novak"], additionalElements:"Mood: Thriller", isFinished:false },
      { id:"11-5", title:"Smoke & Mirrors", number:5, description:"Kyle's confession doesn't add up.", plot:"Interrogation room...", characters:["Jess","Kyle","Attorney"], additionalElements:"Mood: Conflicted", isFinished:false },
      { id:"11-6", title:"Burn Notice", number:6, description:"The final fire is already set.", plot:"Countdown text arrives...", characters:["Jess","Kyle","Torch"], additionalElements:"Mood: Climactic", isFinished:false },
    ],
  },
  {
    id: "12", title: "Parallel Lives", genre: "Sci-Fi", views: 10800, image: img(2),
    description: "Every morning Lena wakes in a different version of her life.",
    episodes: [
      { id:"12-1", title:"Monday A", number:1, description:"Surgeon one second, bartender the next.", plot:"Scalpel then cocktail shaker...", characters:["Lena","Dr. Ames","Mick"], additionalElements:"Mood: Disorienting", isFinished:false },
      { id:"12-2", title:"The Constant", number:2, description:"One person appears in every timeline.", plot:"Stranger on the train...", characters:["Lena","Sam"], additionalElements:"Mood: Hope", isFinished:false },
      { id:"12-3", title:"Entropy", number:3, description:"Timelines bleed into each other.", plot:"Bar glasses on the operating tray...", characters:["Lena","Sam","Dr. Ames"], additionalElements:"Mood: Surreal", isFinished:false },
      { id:"12-4", title:"The Anchor", number:4, description:"Sam reveals Lena built the device.", plot:"Brass compass with too many needles...", characters:["Lena","Sam","Young Lena"], additionalElements:"Responsibility", isFinished:false },
      { id:"12-5", title:"Convergence", number:5, description:"All timelines collapse. Choose who to be.", plot:"Every Lena in one room...", characters:["All Lenas","Sam"], additionalElements:"Mood: Profound", isFinished:false },
    ],
  },
  {
    id: "13", title: "Vine & Thorn", genre: "Fantasy", views: 7400, image: img(0),
    description: "A sentient plant network beneath the Amazon awakens.",
    episodes: [
      { id:"13-1", title:"Root System", number:1, description:"Soil samples sing.", plot:"Spectrograph shows language...", characters:["Dr. Amara Okafor","Leo","The Network"], additionalElements:"Mood: Awe", isFinished:false },
      { id:"13-2", title:"First Word", number:2, description:"The network says 'Return.'", plot:"Every plant turns toward Amara...", characters:["Amara","Leo","Dean"], additionalElements:"Mood: Unnerving", isFinished:false },
      { id:"13-3", title:"Symbiosis", number:3, description:"Knowledge for protection.", plot:"10,000 years of history in seconds...", characters:["Amara","The Network"], additionalElements:"Mood: Transcendent", isFinished:false },
      { id:"13-4", title:"Logging Road", number:4, description:"The network fights back.", plot:"Roots rise through asphalt...", characters:["Amara","Leo","Torres"], additionalElements:"Environmentalism", isFinished:false },
      { id:"13-5", title:"Bloom", number:5, description:"Global bloom. Amara decides its fate.", plot:"Flowers in every city...", characters:["Amara","The Network","World leaders"], additionalElements:"Mood: Epic", isFinished:false },
    ],
  },
  {
    id: "14", title: "Midnight Frequency", genre: "Mystery", views: 8900, badge: "Popular", image: img(3),
    description: "A college radio DJ receives calls that predict events.",
    episodes: [
      { id:"14-1", title:"Dead Air", number:1, description:"First call at 12:01 AM comes true.", plot:"Static then a whisper...", characters:["Zara","Benji","Caller"], additionalElements:"Mood: Intriguing", isFinished:false },
      { id:"14-2", title:"Signal Boost", number:2, description:"Ratings explode.", plot:"Offers, threats, theories...", characters:["Zara","Rhonda","Benji"], additionalElements:"Fame vs. truth", isFinished:false },
      { id:"14-3", title:"Playback", number:3, description:"A second voice hidden in the calls.", plot:"Whisper under the whisper...", characters:["Zara","Tomas","Benji"], additionalElements:"Mood: Paranoia", isFinished:false },
      { id:"14-4", title:"Dial Tone", number:4, description:"Caller goes silent but predictions continue.", plot:"Phone lines dead...", characters:["Zara","Det. Hale","Benji"], additionalElements:"Mood: Dread", isFinished:false },
      { id:"14-5", title:"Live Broadcast", number:5, description:"Zara goes live with the truth.", plot:"Every radio tunes in...", characters:["Zara","Caller (revealed)","Audience"], additionalElements:"Mood: Climactic", isFinished:false },
    ],
  },
  {
    id: "15", title: "Salt & Smoke", genre: "Documentary", views: 7200, image: img(5),
    description: "Chef Noor traces her grandmother's recipes across five countries.",
    episodes: [
      { id:"15-1", title:"The Recipe Box", number:1, description:"Tin box of hand-written recipes.", plot:"Flour-dusted cards...", characters:["Noor","Grandmother","Layla"], additionalElements:"Mood: Warm", isFinished:false },
      { id:"15-2", title:"Beirut Bread", number:2, description:"A bakery that shouldn't still exist.", plot:"The oven hasn't cooled in 60 years...", characters:["Noor","Hassan"], additionalElements:"Mood: Nostalgic", isFinished:false },
      { id:"15-3", title:"Saffron Trail", number:3, description:"Spice merchant in Istanbul.", plot:"Bazaar hums with colour...", characters:["Noor","Elif"], additionalElements:"Mood: Vibrant", isFinished:false },
      { id:"15-4", title:"The Secret Ingredient", number:4, description:"Grandmother had a second family.", plot:"A woman with grandmother's eyes...", characters:["Noor","Claudette"], additionalElements:"Identity theme", isFinished:false },
      { id:"15-5", title:"Last Course", number:5, description:"Both sides of the family, one table.", plot:"One dish tells the whole story...", characters:["Noor","Layla","Claudette","Family"], additionalElements:"Mood: Healing", isFinished:false },
    ],
  },
  {
    id: "16", title: "Ironclad", genre: "Adventure", views: 6800, image: img(7),
    description: "A mechanic finds blueprints for an impossible engine in a junked car.",
    episodes: [
      { id:"16-1", title:"Junkyard Find", number:1, description:"Plans welded inside a 1970 Challenger.", plot:"Grinder reveals a steel compartment...", characters:["Ray","Gus"], additionalElements:"Mood: Mysterious", isFinished:false },
      { id:"16-2", title:"First Spark", number:2, description:"The engine starts and lights flicker.", plot:"A low hum builds...", characters:["Ray","Dana"], additionalElements:"Mood: Excitement", isFinished:false },
      { id:"16-3", title:"Knock on the Door", number:3, description:"Department of Energy arrives.", plot:"Black SUVs...", characters:["Ray","Agent Wells","Gus"], additionalElements:"Little guy vs. system", isFinished:false },
      { id:"16-4", title:"Road Test", number:4, description:"The Challenger hits the highway.", plot:"Needle past 200...", characters:["Ray","Dana","Agents"], additionalElements:"Mood: Freedom", isFinished:false },
      { id:"16-5", title:"Patent War", number:5, description:"Corporation claims ownership.", plot:"Legal docs vs. blueprints...", characters:["Ray","Carmen","Hargrove"], additionalElements:"Mood: Tense", isFinished:false },
      { id:"16-6", title:"Open Source", number:6, description:"Ray leaks the blueprints.", plot:"One upload, a million downloads...", characters:["Ray","Dana","Global"], additionalElements:"Mood: Triumphant", isFinished:false },
    ],
  },
  {
    id: "17", title: "Lovesick Algorithm", genre: "Romance", views: 11900, badge: "Trending", image: img(1),
    description: "A dating-app engineer matches with her worst match. Sparks fly.",
    episodes: [
      { id:"17-1", title:"Bug Report", number:1, description:"Priya matches with Owen — 3% compatibility.", plot:"Notification during her TED talk...", characters:["Priya","Owen"], additionalElements:"Mood: Witty", isFinished:false },
      { id:"17-2", title:"First Coffee", number:2, description:"Terrible coffee, great conversation.", plot:"Rain on the café window...", characters:["Priya","Owen"], additionalElements:"Mood: Banter", isFinished:false },
      { id:"17-3", title:"Data vs. Heart", number:3, description:"Numbers say stop. She doesn't.", plot:"Spreadsheets and butterflies...", characters:["Priya","Owen","Meera"], additionalElements:"Logic vs. emotion", isFinished:false },
      { id:"17-4", title:"The Demo", number:4, description:"Their match shown on live TV.", plot:"The country sees 3%...", characters:["Priya","Owen","Marcus"], additionalElements:"Mood: Turning point", isFinished:false },
      { id:"17-5", title:"Rewrite", number:5, description:"Love can't be computed.", plot:"Commit message: 'Removed certainty.'", characters:["Priya","Owen","Meera"], additionalElements:"Mood: Romantic", isFinished:false },
    ],
  },
  {
    id: "18", title: "Cage Match", genre: "Crime", views: 8700, image: img(6),
    description: "Underground MMA fighter gets a shot at the legitimate title.",
    episodes: [
      { id:"18-1", title:"First Round", number:1, description:"Last underground bout, scouted by a promoter.", plot:"Blood on the mat...", characters:["Dani","Al","Ghost"], additionalElements:"Mood: Raw", isFinished:false },
      { id:"18-2", title:"Training Camp", number:2, description:"Legitimate gym, unlearn dirty tricks.", plot:"Heavy bag doesn't cheat...", characters:["Dani","Coach Rivera","Lex"], additionalElements:"Mood: Growth", isFinished:false },
      { id:"18-3", title:"Weigh-In", number:3, description:"Someone leaks Dani's underground record.", plot:"Cameras flash...", characters:["Dani","Al","Reporter"], additionalElements:"Public shame", isFinished:false },
      { id:"18-4", title:"Corner Work", number:4, description:"Ghost wants a cut or he talks.", plot:"Text at 2 AM...", characters:["Dani","Ghost","Rivera"], additionalElements:"Extortion", isFinished:false },
      { id:"18-5", title:"Title Fight", number:5, description:"Five rounds under the lights.", plot:"Arena sold out. Bell rings...", characters:["Dani","Suki","Rivera"], additionalElements:"Mood: Epic", isFinished:false },
    ],
  },
  {
    id: "19", title: "The Cartographers", genre: "Fantasy", views: 9100, image: img(0),
    description: "Three siblings discover portals hidden inside hand-drawn maps.",
    episodes: [
      { id:"19-1", title:"Paper Doors", number:1, description:"Eldest unfolds a map into 1920s Paris.", plot:"Map glows, floor drops away...", characters:["Kade","Lina","Joss"], additionalElements:"Mood: Magical", isFinished:false },
      { id:"19-2", title:"Ink Boundaries", number:2, description:"Staying too long changes the map.", plot:"Coffee stain becomes a lake...", characters:["Lina","Celeste"], additionalElements:"Consequence", isFinished:false },
      { id:"19-3", title:"The Collector", number:3, description:"Rival dealer wants the portals.", plot:"Auction house whispers...", characters:["Kade","Harlow","Joss"], additionalElements:"Mood: Heist", isFinished:false },
      { id:"19-4", title:"Uncharted", number:4, description:"Joss creates a world from scratch.", plot:"Pencil moves, mountains rise...", characters:["Joss","Lina","Inhabitants"], additionalElements:"Creation theme", isFinished:false },
      { id:"19-5", title:"Fold", number:5, description:"Close the portals from the inside.", plot:"Paper worlds crumble...", characters:["Kade","Lina","Joss","Father"], additionalElements:"Mood: Urgent", isFinished:false },
      { id:"19-6", title:"Legend", number:6, description:"Father's last map leads home.", plot:"Map of the shop itself...", characters:["All siblings","Father (spirit)"], additionalElements:"Mood: Healing", isFinished:false },
    ],
  },
  {
    id: "20", title: "Bandwidth", genre: "Sci-Fi", views: 13400, badge: "New Episode", image: img(8),
    description: "Viewers can vote to control a live-streamer's real life for 24 hours.",
    episodes: [
      { id:"20-1", title:"Go Live", number:1, description:"Sierra accepts the challenge.", plot:"Donate button becomes a command console...", characters:["Sierra","Kai","The Chat"], additionalElements:"Mood: Fun turning dark", isFinished:false },
      { id:"20-2", title:"Poll Results", number:2, description:"Votes escalate dangerously.", plot:"Option A or Option B...", characters:["Sierra","Kai","Mateo"], additionalElements:"Mob mentality", isFinished:false },
      { id:"20-3", title:"Donation Goal", number:3, description:"$100K donor with a terrifying condition.", plot:"Number climbs...", characters:["Sierra","Architect","Kai"], additionalElements:"Mood: Thriller", isFinished:false },
      { id:"20-4", title:"Offline", number:4, description:"The stream won't end.", plot:"Every device goes live...", characters:["Sierra","Rowan","Architect"], additionalElements:"Mood: Horror", isFinished:false },
      { id:"20-5", title:"Counter-Stream", number:5, description:"Viewers become Sierra's army.", plot:"Hashtag trends worldwide...", characters:["Sierra","Kai","Audience"], additionalElements:"Mood: Empowering", isFinished:false },
      { id:"20-6", title:"Sign Off", number:6, description:"Sierra ends the stream for real.", plot:"One final frame. No filter...", characters:["Sierra"], additionalElements:"Mood: Defiant", isFinished:false },
    ],
  },
];

const creatorStats = {
  totalViews: 189700,
  totalStories: 20,
  followers: 3842,
  primaryNiche: "Fantasy",
  secondaryNiche: "Sci-Fi",
  endingPreferences: {
    "The Last Kingdom": { endingA: 65, endingB: 35 },
    "Neon Shadows": { endingA: 48, endingB: 52 },
  },
  topStories: [
    { title: "Neon Shadows", views: 15200 },
    { title: "Bandwidth", views: 13400 },
    { title: "The Last Kingdom", views: 12500 },
    { title: "Lovesick Algorithm", views: 11900 },
    { title: "The Relic Hunter", views: 11300 },
  ],
  trendingTopics: [
    "AI Dystopia", "Time Loop", "Found Family", "Slow Burn Romance",
    "Heist Gone Wrong", "Dark Academia", "Multiverse", "Unreliable Narrator",
  ],
  nicheTopics: {
    Fantasy: ["Dragon Riders", "Court Intrigue", "Prophecy Subversion", "Magic Systems"],
    Romance: ["Enemies to Lovers", "Second Chance", "Fake Dating", "Grumpy x Sunshine"],
    "Sci-Fi": ["First Contact", "Space Opera", "Cyberpunk Noir", "AI Sentience"],
    Mystery: ["Locked Room", "Amateur Sleuth", "Cozy Mystery", "Psychological Thriller"],
    Adventure: ["Lost Civilizations", "Treasure Hunt", "Survival", "Expedition Gone Wrong"],
    Crime: ["Police Procedural", "Vigilante Justice", "True Crime Inspired", "Cold Cases"],
    Documentary: ["Creator Diaries", "Behind the Lens", "Origin Stories", "Street Culture"],
  },
};

/* ── Seed logic ─────────────────────────────────────────────────── */
async function seed() {
  // Authenticate first
  console.log(`🔐  Signing in as ${email}…`);
  await signInWithEmailAndPassword(auth, email, password);
  console.log("✅  Authenticated");

  const promises = [];

  // Shows
  for (const show of shows) {
    promises.push(setDoc(doc(db, "shows", show.id), show));
  }

  // Creator stats + topics (single doc)
  promises.push(setDoc(doc(db, "meta", "creatorStats"), creatorStats));

  await Promise.all(promises);

  const totalEpisodes = shows.reduce((sum, s) => sum + s.episodes.length, 0);
  console.log(`✅  Seeded ${shows.length} shows (${totalEpisodes} episodes) + creator stats`);
  process.exit(0);
}

seed().catch((err) => {
  console.error("Seed failed:", err);
  process.exit(1);
});
