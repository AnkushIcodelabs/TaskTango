import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import type {PayloadAction} from '@reduxjs/toolkit';

export interface AuthInitialState {
  user: string | null;
  loading: boolean;
}

const initialState: AuthInitialState = {
  user: null,
  loading: false,
};

export const authSlice = createSlice({
  name: 'authSlice',
  initialState,
  reducers: {
    resetAuthState: () => {
      return initialState;
    },
  },
  extraReducers: () => {},
});

export const signupUser = createAsyncThunk(
  'auth/signup',
  async (params, {}) => {
    try {
    } catch (error) {}
  },
);

export const loginUser = createAsyncThunk(
  'auth/login',
  async (params, {}) => {},
);

export const {} = authSlice.actions;

export default authSlice.reducer;
