import React from 'react';
import { Alert, Snackbar } from '@mui/material';
import { AppActions, selectErrorMessage } from '../../app/appSlice';
import { useAppDispatch, useAppSelector } from '../../app/hooks';

const ErrorHandler = (): JSX.Element => {
  const errorMessage = useAppSelector(selectErrorMessage);
  const appDispatch = useAppDispatch();

  const handleCloseSnackbar = () => {
    appDispatch(AppActions.clearError());
  };

  return (
    <Snackbar
      anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      key={'top-center'}
      open={!!errorMessage}
      autoHideDuration={6000}
      onClose={handleCloseSnackbar}
    >
      <Alert
        onClose={handleCloseSnackbar}
        severity="error"
        sx={{ width: '100%' }}
      >
        {errorMessage}
      </Alert>
    </Snackbar>
  );
};

export default ErrorHandler;
