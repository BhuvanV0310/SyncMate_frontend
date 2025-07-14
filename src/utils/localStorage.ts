import { Match } from '../types';

const SHORTLIST_KEY = 'companion-matcher-shortlist';
const PROFILE_KEY = 'companion-matcher-profile';

export const getShortlist = (): Match[] => {
  try {
    const shortlist = localStorage.getItem(SHORTLIST_KEY);
    return shortlist ? JSON.parse(shortlist) : [];
  } catch {
    return [];
  }
};

export const addToShortlist = (match: Match): void => {
  const shortlist = getShortlist();
  const exists = shortlist.find(item => item.id === match.id);
  if (!exists) {
    const updatedShortlist = [...shortlist, match];
    localStorage.setItem(SHORTLIST_KEY, JSON.stringify(updatedShortlist));
  }
};

export const removeFromShortlist = (matchId: string): void => {
  const shortlist = getShortlist();
  const updatedShortlist = shortlist.filter(item => item.id !== matchId);
  localStorage.setItem(SHORTLIST_KEY, JSON.stringify(updatedShortlist));
};

export const isInShortlist = (matchId: string): boolean => {
  const shortlist = getShortlist();
  return shortlist.some(item => item.id === matchId);
};

export const saveProfile = (profile: any): void => {
  localStorage.setItem(PROFILE_KEY, JSON.stringify(profile));
};

export const getProfile = () => {
  try {
    const profile = localStorage.getItem(PROFILE_KEY);
    return profile ? JSON.parse(profile) : null;
  } catch {
    return null;
  }
};