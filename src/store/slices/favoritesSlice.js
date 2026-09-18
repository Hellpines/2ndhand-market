import { createSlice } from '@reduxjs/toolkit';
import { loginSuccess, logout } from './authSlice';

const getUserId = () => {
  const user = JSON.parse(localStorage.getItem('currentUser'));
  return user?.id || null;
};

const loadFavorites = () => {
  const userId = getUserId();
  if (!userId) return [];
  const data = localStorage.getItem(`favorites_${userId}`);
  return data ? JSON.parse(data) : [];
};

const saveFavorites = (items) => {
  const userId = getUserId();
  if (userId) {
    localStorage.setItem(`favorites_${userId}`, JSON.stringify(items));
  }
};

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState: {
    items: loadFavorites(),
  },
  reducers: {
    toggleFavorite: (state, action) => {
      const product = action.payload;
      const index = state.items.findIndex((item) => item.id === product.id);
      if (index === -1) {
        state.items.push(product);
      } else {
        state.items.splice(index, 1);
      }
      saveFavorites(state.items);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginSuccess, (state, action) => {
        const userId = action.payload.id;
        const data = localStorage.getItem(`favorites_${userId}`);
        state.items = data ? JSON.parse(data) : [];
      })
      .addCase(logout, (state) => {
        state.items = [];
      });
  },
});

export const { toggleFavorite } = favoritesSlice.actions;
export const selectFavorites = (state) => state.favorites.items;
export const selectFavoritesCount = (state) => state.favorites.items.length;

export default favoritesSlice.reducer;