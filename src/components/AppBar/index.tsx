import React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import { DarkMode, LightMode } from '@mui/icons-material';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { AppActions, selectCurrentTheme } from '../../app/appSlice';
import { selectUser } from '../../features/auth/authSlice';
import { Button } from '@mui/material';

const HeaderActions = styled('div')(() => ({
  marginLeft: 'auto',
  display: 'flex',
  gap: '25px',
}));

interface AppBar {
  onClickLogin: () => void;
  onClickLogout: () => void;
  children: React.ReactNode;
}

function AppBar(props: AppBar): JSX.Element {
  const user = useAppSelector(selectUser);
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
            <Button
              variant="contained"
              onClick={user ? props.onClickLogout : props.onClickLogin}
            >
              {user ? 'Logout' : 'Login'}
            </Button>
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
