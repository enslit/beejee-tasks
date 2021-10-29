import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from './store';
import { Themes } from './theme';

type AppMessageType = 'error' | 'warning' | 'success';

type AppMessage = {
  type: AppMessageType;
  text: string;
} | null;

interface ImportState {
  message: AppMessage;
  theme: keyof typeof Themes;
}

const initialState: ImportState = {
  message: null,
  theme: 'dark',
};

export const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    changeTheme: (state) => {
      state.theme = state.theme === 'dark' ? 'light' : 'dark';
    },
    setMessage: (
      state,
      action: PayloadAction<{ type: AppMessageType; text: string }>
    ) => {
      state.message = {
        type: action.payload.type,
        text: action.payload.text,
      };
    },
    clearMessage: (state) => {
      state.message = null;
    },
  },
});

export const AppActions = appSlice.actions;

export const selectAppMessage = (state: RootState): AppMessage =>
  state.app.message;
export const selectCurrentTheme = (state: RootState): keyof typeof Themes =>
  state.app.theme;

export default appSlice.reducer;
