const KEY = "favorites";

// Get all favorites
export const getFavorites = () => {
  const data = localStorage.getItem(KEY);
  return data ? JSON.parse(data) : [];
};

// Save favorites
export const saveFavorites = (movies) => {
  localStorage.setItem(KEY, JSON.stringify(movies));
};

// Toggle favorite
export const toggleFavorite = (movie) => {
  const favorites = getFavorites();

  const exists = favorites.find((m) => m.id === movie.id);

  let updated;

  if (exists) {
    updated = favorites.filter((m) => m.id !== movie.id);
  } else {
    updated = [...favorites, movie];
  }

  saveFavorites(updated);
  return updated;
};

// Check if favorite
export const isFavorite = (id) => {
  return getFavorites().some((m) => m.id === id);
};