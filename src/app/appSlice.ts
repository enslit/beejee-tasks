import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from './store';
import { Themes } from './theme';

interface ImportState {
  error: string;
  warning: string;
  theme: keyof typeof Themes;
}

const initialState: ImportState = {
  error: '',
  warning: '',
  theme: 'dark',
};

export const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    changeTheme: (state) => {
      state.theme = state.theme === 'dark' ? 'light' : 'dark';
    },
    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
    },
    clearError: (state) => {
      state.error = '';
    },
    setWarning: (state, action: PayloadAction<string>) => {
      state.warning = action.payload;
    },
    clearWarning: (state) => {
      state.warning = '';
    },
  },
});

export const AppActions = appSlice.actions;

export const selectErrorMessage = (state: RootState): string => state.app.error;
export const selectWarningMessage = (state: RootState): string =>
  state.app.warning;
export const selectCurrentTheme = (state: RootState): keyof typeof Themes =>
  state.app.theme;

export default appSlice.reducer;
