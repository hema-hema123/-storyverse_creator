import { auth } from "../lib/firebase";

const API_BASE = "http://localhost:3001";

export type CreatorProfile = {
  uid: string;
  email: string | null;
  interestedGenres: string[];
  chosenEnding: string | null;
};

// GET profile
export async function getCreatorProfile(): Promise<CreatorProfile> {
  const user = auth.currentUser;
  if (!user) throw new Error("Not logged in");

  const token = await user.getIdToken();

  const res = await fetch(`${API_BASE}/api/me`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    throw new Error("Failed to load profile");
  }

  return res.json();
}

// SAVE profile
export async function saveCreatorProfile(
  interestedGenres: string[],
  chosenEnding: string | null
): Promise<CreatorProfile> {
  const user = auth.currentUser;
  if (!user) throw new Error("Not logged in");

  const token = await user.getIdToken();

  const res = await fetch(`${API_BASE}/api/me`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ interestedGenres, chosenEnding }),
  });

  if (!res.ok) {
    throw new Error("Failed to save profile");
  }

  return res.json();
}

