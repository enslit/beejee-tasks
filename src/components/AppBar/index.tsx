import React, { FC, useCallback } from 'react';
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
import { AuthSagaActions } from '../../features/auth/sagaActions';
import { Link } from 'react-router-dom';
import { ROUTES } from '../../app/constants/routes';

const HeaderActions = styled('div')(() => ({
  marginLeft: 'auto',
  display: 'flex',
  alignItems: 'center',
  gap: '25px',
}));

const Title = styled('div')(() => ({
  display: 'flex',
  alignItems: 'center',
  gap: '15px',
}));

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const AppBar: FC = (props): JSX.Element => {
  const user = useAppSelector(selectUser);
  const currentTheme = useAppSelector(selectCurrentTheme);
  const dispatch = useAppDispatch();

  const handlerToggleTheme = () => {
    dispatch(AppActions.changeTheme());
  };

  const handleClickLogout = useCallback(() => {
    dispatch(AuthSagaActions.logout());
  }, [dispatch]);

  return (
    <Box sx={{ display: 'flex' }}>
      <MuiAppBar position="fixed">
        <Toolbar>
          <Title>
            <Typography variant="h6" noWrap component="div">
              BeeJee Task List
            </Typography>
            {user?.isAdmin && (
              <Typography variant="subtitle1" noWrap component="span">
                {' '}
                (Admin mode)
              </Typography>
            )}
          </Title>
          <HeaderActions>
            <IconButton
              color="inherit"
              aria-label="change theme"
              edge="end"
              onClick={handlerToggleTheme}
            >
              {currentTheme === 'dark' ? <DarkMode /> : <LightMode />}
            </IconButton>
            {user ? (
              <Button variant="contained" onClick={handleClickLogout}>
                Logout
              </Button>
            ) : (
              <Button component={Link} variant="contained" to={ROUTES.login}>
                Login
              </Button>
            )}
          </HeaderActions>
        </Toolbar>
      </MuiAppBar>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <DrawerHeader />
        {props.children}
      </Box>
    </Box>
  );
};

export default AppBar;
