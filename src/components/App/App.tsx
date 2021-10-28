import React, { useCallback, useState } from 'react';
import { CssBaseline, Modal } from '@mui/material';
import AppBar from '../AppBar';
import Tasks from '../../features/tasks/Tasks';
import { selectUser } from '../../features/auth/authSlice';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import Login from '../../features/auth/Login';
import { AuthSagaActions } from '../../features/auth/sagaActions';

function App() {
  const dispatch = useAppDispatch();

  const [isOpenLoginModal, setOpenLoginModal] = useState(false);

  const user = useAppSelector(selectUser);

  const handleCloseModal = useCallback(() => {
    setOpenLoginModal(false);
  }, []);

  const handleClickLogin = useCallback(() => {
    setOpenLoginModal(true);
  }, []);

  const handleClickLogout = useCallback(() => {
    dispatch(AuthSagaActions.logout());
  }, [dispatch]);

  return (
    <>
      <CssBaseline />
      <AppBar onClickLogin={handleClickLogin} onClickLogout={handleClickLogout}>
        <Tasks />
      </AppBar>

      {!user && (
        <Modal
          open={isOpenLoginModal}
          onClose={handleCloseModal}
          aria-labelledby="login modal"
        >
          <Login onClose={handleCloseModal} />
        </Modal>
      )}
    </>
  );
}

export default App;
