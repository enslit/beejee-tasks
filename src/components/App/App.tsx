import React from 'react';
import { CssBaseline } from '@mui/material';
import AppBar from '../AppBar';
import Tasks from '../../features/tasks/Tasks';

function App() {
  return (
    <>
      <CssBaseline />
      <AppBar>
        <Tasks />
      </AppBar>
    </>
  );
}

export default App;
