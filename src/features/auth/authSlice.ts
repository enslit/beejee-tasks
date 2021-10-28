import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { User } from './models/User';

interface InitState {
  user: User | null;
  isLoading: boolean;
  error: string | Record<string, string>;
}

const initialState: InitState = {
  user: null,
  isLoading: false,
  error: '',
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
    },
    logout: (state) => {
      state.user = null;
    },
    setLoadingState: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
    },
    clearError: (state) => {
      state.error = '';
    },
  },
});

export const AuthSliceActions = authSlice.actions;

export const selectUser = (state: RootState): User | null => state.auth.user;
export const selectLoadingState = (state: RootState): boolean =>
  state.auth.isLoading;
export const selectErrorMessage = (
  state: RootState
): string | Record<string, string> => state.auth.error;

export default authSlice.reducer;
