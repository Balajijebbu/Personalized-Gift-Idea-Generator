import { configureStore } from '@reduxjs/toolkit';
import giftsReducer from '../slices/giftsSlice';
import favoritesReducer from '../slices/favoritesSlice';
import filtersReducer from '../slices/filtersSlice';
import userReducer from '../slices/userSlice';

const store = configureStore({
  reducer: {
    gifts: giftsReducer,
    favorites: favoritesReducer,
    filters: filtersReducer,
    user: userReducer,
  },
});

export default store;
