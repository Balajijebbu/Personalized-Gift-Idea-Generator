import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Async thunk to fetch gifts from public/gift.json
export const fetchGifts = createAsyncThunk('gifts/fetchGifts', async () => {
  const response = await fetch('/gift.json');
  const data = await response.json();
  return data.gifts;
});

const giftsSlice = createSlice({
  name: 'gifts',
  initialState: {
    allGifts: JSON.parse(localStorage.getItem('gifts')) || [],
    status: 'idle',
    error: null,
  },
  reducers: {
    addGift: (state, action) => {
      state.allGifts.push(action.payload);
      localStorage.setItem('gifts', JSON.stringify(state.allGifts));
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchGifts.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchGifts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        // Only set gifts from fetch if localStorage is empty
        if (!localStorage.getItem('gifts')) {
          state.allGifts = action.payload;
          localStorage.setItem('gifts', JSON.stringify(action.payload));
        }
      })
      .addCase(fetchGifts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export const { addGift } = giftsSlice.actions;

export default giftsSlice.reducer;
