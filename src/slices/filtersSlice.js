import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  ageCategory: '',
  interests: [],
  budget: [0, 1000], 
};

const filtersSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    setAgeCategory: (state, action) => {
      state.ageCategory = action.payload;
    },
    setInterests: (state, action) => {
      state.interests = action.payload;
    },
    setBudget: (state, action) => {
      state.budget = action.payload;
    },
  },
});

export const { setAgeCategory, setInterests, setBudget } = filtersSlice.actions;

export default filtersSlice.reducer;
