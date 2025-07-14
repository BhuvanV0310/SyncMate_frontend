import { API_BASE_URL } from "../constants";
import { Profile, Match } from "../types";

export const createUser = async (profile: Profile) => {
  const res = await fetch(`${API_BASE_URL}/users`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(profile)
  });

  if (!res.ok) throw new Error("Failed to create user");
  return res.json();
};

export const fetchMatches = async (username: string): Promise<Match[]> => {
  const res = await fetch(`${API_BASE_URL}/matches/${username}`);
  if (!res.ok) throw new Error("Failed to fetch matches");
  return res.json();
};
