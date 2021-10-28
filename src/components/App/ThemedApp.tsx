import React from 'react';
import { Themes } from '../../app/theme';
import { StyledEngineProvider, ThemeProvider } from '@mui/material/styles';
import { useAppSelector } from '../../app/hooks';
import { selectCurrentTheme } from '../../app/appSlice';
import App from './App';
import { CssBaseline } from '@mui/material';

const AppThemed = (): JSX.Element => {
  const currentTheme = useAppSelector(selectCurrentTheme);

  return (
    <ThemeProvider theme={Themes[currentTheme]}>
      <StyledEngineProvider injectFirst>
        <CssBaseline />
        <App />
      </StyledEngineProvider>
    </ThemeProvider>
  );
};

export default AppThemed;
