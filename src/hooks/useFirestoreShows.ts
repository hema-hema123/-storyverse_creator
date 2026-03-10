import { useEffect, useState } from "react";
import {
  collection,
  onSnapshot,
  query,
  orderBy,
  QueryDocumentSnapshot,
} from "firebase/firestore";
import { db } from "@/lib/firebase";
import { shows as mockShows, type Show } from "@/data/mockData";

// Import actual Vite-bundled image assets for mapping
import showFantasy from "@/assets/show-fantasy.jpg";
import showRomance from "@/assets/show-romance.jpg";
import showScifi from "@/assets/show-scifi.jpg";
import showMystery from "@/assets/show-mystery.jpg";
import glassGarden from "@/assets/glass-garden.jpg";
import showAdventure from "@/assets/show-adventure.jpg";
import showCrime from "@/assets/show-crime.jpg";
import heroBanner from "@/assets/hero-banner.jpg";
import netflixBackground from "@/assets/netflix-background.jpg";

// Map the seed-script path strings to real bundled URLs
const imageMap: Record<string, string> = {
  "/assets/show-fantasy.jpg": showFantasy,
  "/assets/show-romance.jpg": showRomance,
  "/assets/show-scifi.jpg": showScifi,
  "/assets/show-mystery.jpg": showMystery,
  "/assets/glass-garden.jpg": glassGarden,
  "/assets/show-adventure.jpg": showAdventure,
  "/assets/show-crime.jpg": showCrime,
  "/assets/hero-banner.jpg": heroBanner,
  "/assets/netflix-background.jpg": netflixBackground,
};

/**
 * Real-time Firestore hook for the `shows` collection.
 *
 * • Subscribes via `onSnapshot` so any Firestore write is reflected instantly
 *   across every connected client (live multi-user collaboration).
 * • Falls back to local mock data when:
 *   – Firestore isn't configured (missing env vars / no project)
 *   – The `shows` collection is empty (seed script hasn't run)
 *   – The listener errors out
 */
export function useFirestoreShows() {
  const [shows, setShows] = useState<Show[]>(mockShows);
  const [loading, setLoading] = useState(true);
  const [isLive, setIsLive] = useState(false);

  useEffect(() => {
    // If Firestore has no projectId configured, skip and use mock data
    if (!db) {
      setLoading(false);
      return;
    }

    const q = query(collection(db, "shows"), orderBy("title"));

    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        if (snapshot.empty) {
          // Collection exists but is empty → keep mock data
          setShows(mockShows);
          setIsLive(false);
        } else {
          const liveShows = snapshot.docs.map(docToShow);
          setShows(liveShows);
          setIsLive(true);
        }
        setLoading(false);
      },
      (error) => {
        console.warn("Firestore shows listener error, using mock data:", error.message);
        setShows(mockShows);
        setIsLive(false);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, []);

  return { shows, loading, isLive };
}

/* ------------------------------------------------------------------ */
/*  Helper: Firestore doc → Show type                                 */
/* ------------------------------------------------------------------ */
function docToShow(doc: QueryDocumentSnapshot): Show {
  const d = doc.data();
  const rawImage = d.image ?? "";
  return {
    id: doc.id,
    title: d.title ?? "",
    description: d.description ?? "",
    image: imageMap[rawImage] ?? rawImage,
    genre: d.genre ?? "",
    views: d.views ?? 0,
    badge: d.badge,
    episodes: Array.isArray(d.episodes) ? d.episodes : [],
  };
}
