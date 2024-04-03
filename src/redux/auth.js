import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: {
    userNumber: null,
    userName: null,
    role: null,
    token: null
  }
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    clearAuth: (state) => {
      state.user = initialState.user;
    }
  }
});

export const { setUser, clearAuth } = authSlice.actions;

export default authSlice;
