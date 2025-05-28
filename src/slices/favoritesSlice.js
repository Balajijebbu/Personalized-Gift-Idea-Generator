import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  favorites: JSON.parse(localStorage.getItem('favorites')) || [],
};

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    addFavorite: (state, action) => {
      if (!state.favorites.find(gift => gift.id === action.payload.id)) {
        state.favorites.push(action.payload);
        localStorage.setItem('favorites', JSON.stringify(state.favorites));
      }
    },
    removeFavorite: (state, action) => {
      state.favorites = state.favorites.filter(gift => gift.id !== action.payload);
      localStorage.setItem('favorites', JSON.stringify(state.favorites));
    },
    reorderFavorites: (state, action) => {
      // Replace favorites array immutably
      state.favorites = [...action.payload];
      localStorage.setItem('favorites', JSON.stringify(state.favorites));
    },
    updateNote: (state, action) => {
      const { id, note } = action.payload;
      const gift = state.favorites.find(gift => gift.id === id);
      if (gift) {
        gift.note = note;
        localStorage.setItem('favorites', JSON.stringify(state.favorites));
      }
    },
  },
});

export const { addFavorite, removeFavorite, reorderFavorites, updateNote } = favoritesSlice.actions;

export default favoritesSlice.reducer;
