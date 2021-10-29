import React from 'react';
import { Alert, Snackbar } from '@mui/material';
import { AppActions, selectAppMessage } from '../../app/appSlice';
import { useAppDispatch, useAppSelector } from '../../app/hooks';

const MessageHandler = (): JSX.Element => {
  const appMessage = useAppSelector(selectAppMessage);
  const appDispatch = useAppDispatch();

  const handleCloseSnackbar = () => {
    appDispatch(AppActions.clearMessage());
  };

  return (
    <Snackbar
      anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      key={'bottom-center'}
      open={!!appMessage}
      autoHideDuration={6000}
      onClose={handleCloseSnackbar}
    >
      <Alert
        onClose={handleCloseSnackbar}
        severity={appMessage?.type || undefined}
        sx={{ width: '100%' }}
      >
        {appMessage?.text}
      </Alert>
    </Snackbar>
  );
};

export default MessageHandler;
