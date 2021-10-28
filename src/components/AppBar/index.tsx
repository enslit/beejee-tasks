import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import { DarkMode, LightMode } from '@mui/icons-material';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { AppActions, selectCurrentTheme } from '../../app/appSlice';

const HeaderActions = styled('div')(() => ({
  marginLeft: 'auto',
}));

interface AppBar {
  children: React.ReactNode;
}

function AppBar(props: AppBar): JSX.Element {
  const currentTheme = useAppSelector(selectCurrentTheme);
  const appDispatch = useAppDispatch();

  const handlerToggleTheme = () => {
    appDispatch(AppActions.changeTheme());
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <MuiAppBar position="fixed">
        <Toolbar>
          <Typography variant="h6" noWrap component="div">
            Task List
          </Typography>
          <HeaderActions>
            <IconButton
              color="inherit"
              aria-label="change theme"
              edge="end"
              onClick={handlerToggleTheme}
            >
              {currentTheme === 'dark' ? <DarkMode /> : <LightMode />}
            </IconButton>
          </HeaderActions>
        </Toolbar>
      </MuiAppBar>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        {props.children}
      </Box>
    </Box>
  );
}

export default AppBar;
