import { SingleSingerModel } from '../../domain/singers/singer.entity';

const STORAGE_KEY = 'recent_searches';
const MAX_ITEMS = 5;

export const saveRecentSearch = (singer: SingleSingerModel) => {
  const stored = localStorage.getItem(STORAGE_KEY);

  let searches: SingleSingerModel[] = stored ? JSON.parse(stored) : [];

  // evitar duplicados
  searches = searches.filter(item => item.id !== singer.id);

  // agregar al inicio
  searches.unshift(singer);

  if (searches.length > MAX_ITEMS) {
    searches = searches.slice(0, MAX_ITEMS);
  }

  localStorage.setItem(STORAGE_KEY, JSON.stringify(searches));
};

export const getRecentSearches = (): SingleSingerModel[] => {
  const stored = localStorage.getItem(STORAGE_KEY);

  return stored ? JSON.parse(stored) : [];
};