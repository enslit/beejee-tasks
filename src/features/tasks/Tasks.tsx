import React, { FC } from 'react';
import { useAppSelector } from '../../app/hooks';
import {
  selectTasks,
  selectTasksError,
  selectTasksLoadingState,
  selectTotalTasks,
} from './tasksSlice';
import { Box, List, ListItem, Typography } from '@mui/material';

const Tasks: FC = () => {
  const taskList = useAppSelector(selectTasks);
  const totalTasks = useAppSelector(selectTotalTasks);
  const isLoading = useAppSelector(selectTasksLoadingState);
  const error = useAppSelector(selectTasksError);

  return (
    <Box>
      <Typography variant={'h6'} component={'div'}>
        {isLoading ? 'Loading...' : `Total tasks: ${totalTasks}`}
      </Typography>
      {error && (
        <Typography variant={'h6'} component={'div'} color={'error'}>
          {error}
        </Typography>
      )}
      {taskList.length > 0 && (
        <List>
          {taskList.map((task) => (
            <ListItem key={task.id}>{task.text}</ListItem>
          ))}
        </List>
      )}
    </Box>
  );
};

export default Tasks;
