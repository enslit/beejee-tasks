import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from './store';
import { Themes } from './theme';

interface ImportState {
  error: string;
  theme: keyof typeof Themes;
}

const initialState: ImportState = {
  error: '',
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
  },
});

export const AppActions = appSlice.actions;

export const selectErrorMessage = (state: RootState): string => state.app.error;
export const selectCurrentTheme = (state: RootState): keyof typeof Themes =>
  state.app.theme;

export default appSlice.reducer;
