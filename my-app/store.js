import { atom } from 'jotai';
import { atomWithStorage } from 'jotai/utils';

export const favouritesAtom = atom([]);
export const searchHistoryAtom = atomWithStorage('search_history', []); // Persist in localStorage
export const recentlyViewedAtom = atomWithStorage('view_history', []); // Persist recent books

export const themeAtom = atomWithStorage('theme', 'dark');