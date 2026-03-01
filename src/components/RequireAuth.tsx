import { Navigate, useLocation } from "react-router-dom";
import { onAuthStateChanged, signOut, User } from "firebase/auth";
import { useEffect, useMemo, useRef, useState } from "react";
import { auth } from "@/lib/firebase";

const LAST_ACTIVE_KEY = "storyverse_last_active";
const INACTIVITY_LIMIT_MS = 10 * 60 * 1000; // 10 minutes

function setLastActiveNow() {
  localStorage.setItem(LAST_ACTIVE_KEY, String(Date.now()));
}

function getLastActive() {
  const raw = localStorage.getItem(LAST_ACTIVE_KEY);
  const parsed = raw ? Number(raw) : 0;
  return Number.isFinite(parsed) ? parsed : 0;
}

export default function RequireAuth({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const timeoutRef = useRef<number | null>(null);

  const activityEvents = useMemo(
    () => ["mousemove", "mousedown", "keydown", "touchstart", "scroll"],
    []
  );

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => {
      setUser(u);
      setLoading(false);
      if (u) setLastActiveNow();
    });
    return () => unsub();
  }, []);

  useEffect(() => {
    if (!user) return;

    const scheduleLogout = () => {
      if (timeoutRef.current) {
        window.clearTimeout(timeoutRef.current);
      }
      const lastActive = getLastActive() || Date.now();
      const remaining = INACTIVITY_LIMIT_MS - (Date.now() - lastActive);
      if (remaining <= 0) {
        signOut(auth);
        return;
      }
      timeoutRef.current = window.setTimeout(() => {
        signOut(auth);
      }, remaining);
    };

    const handleActivity = () => {
      setLastActiveNow();
      scheduleLogout();
    };

    const handleVisibility = () => {
      if (document.visibilityState === "visible") {
        const lastActive = getLastActive();
        if (lastActive && Date.now() - lastActive > INACTIVITY_LIMIT_MS) {
          signOut(auth);
          return;
        }
        scheduleLogout();
      }
    };

    activityEvents.forEach((event) =>
      window.addEventListener(event, handleActivity, { passive: true })
    );
    window.addEventListener("focus", handleVisibility);
    document.addEventListener("visibilitychange", handleVisibility);

    scheduleLogout();

    return () => {
      activityEvents.forEach((event) => window.removeEventListener(event, handleActivity));
      window.removeEventListener("focus", handleVisibility);
      document.removeEventListener("visibilitychange", handleVisibility);
      if (timeoutRef.current) window.clearTimeout(timeoutRef.current);
    };
  }, [activityEvents, user]);

  if (loading) return null;
  if (!user) return <Navigate to="/login" replace state={{ from: location }} />;

  return <>{children}</>;
}
