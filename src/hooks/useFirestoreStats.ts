import { useEffect, useState } from "react";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "@/lib/firebase";
import {
  creatorStats as mockStats,
  trendingTopics as mockTrending,
  nicheTopics as mockNiche,
} from "@/data/mockData";

type CreatorStats = typeof mockStats;

/**
 * Real-time Firestore hook for creator stats, trending topics, and niche topics.
 *
 * Reads from:
 *   • `meta/creatorStats`   – single document with stats + topics
 *
 * Falls back to local mock data when Firestore is unavailable or the
 * document doesn't exist yet.
 */
export function useFirestoreStats() {
  const [creatorStats, setCreatorStats] = useState<CreatorStats>(mockStats);
  const [trendingTopics, setTrendingTopics] = useState<string[]>(mockTrending);
  const [nicheTopics, setNicheTopics] = useState<Record<string, string[]>>(mockNiche);
  const [loading, setLoading] = useState(true);
  const [isLive, setIsLive] = useState(false);

  useEffect(() => {
    if (!db) {
      setLoading(false);
      return;
    }

    const ref = doc(db, "meta", "creatorStats");

    const unsubscribe = onSnapshot(
      ref,
      (snap) => {
        if (!snap.exists()) {
          // Document doesn't exist yet → keep mock data
          setCreatorStats(mockStats);
          setTrendingTopics(mockTrending);
          setNicheTopics(mockNiche);
          setIsLive(false);
        } else {
          const d = snap.data();
          setCreatorStats({
            totalViews: d.totalViews ?? mockStats.totalViews,
            totalStories: d.totalStories ?? mockStats.totalStories,
            followers: d.followers ?? mockStats.followers,
            primaryNiche: d.primaryNiche ?? mockStats.primaryNiche,
            secondaryNiche: d.secondaryNiche ?? mockStats.secondaryNiche,
            endingPreferences: d.endingPreferences ?? mockStats.endingPreferences,
            topStories: d.topStories ?? mockStats.topStories,
          });
          if (Array.isArray(d.trendingTopics)) setTrendingTopics(d.trendingTopics);
          if (d.nicheTopics && typeof d.nicheTopics === "object") setNicheTopics(d.nicheTopics);
          setIsLive(true);
        }
        setLoading(false);
      },
      (error) => {
        console.warn("Firestore stats listener error, using mock data:", error.message);
        setIsLive(false);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, []);

  return { creatorStats, trendingTopics, nicheTopics, loading, isLive };
}
