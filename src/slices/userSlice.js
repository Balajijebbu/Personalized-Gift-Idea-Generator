import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  role: 'admin', // Change to 'admin' to test admin access
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setRole: (state, action) => {
      state.role = action.payload;
    },
  },
});

export const { setRole } = userSlice.actions;

export default userSlice.reducer;
