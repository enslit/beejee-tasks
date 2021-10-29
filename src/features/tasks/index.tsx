import React, { ChangeEvent, useCallback } from 'react';
import { TasksSagaActions } from './sagaActions';
import { TaskSliceActions } from './tasksSlice';
import { SelectChangeEvent } from '@mui/material';
import { Task } from './models/Task';
import { SortDirection } from './models/SortDirection';
import { useAppDispatch } from '../../app/hooks';
import TaskList from './components/TaskList';

const Tasks = () => {
  const dispatch = useAppDispatch();

  const handleSaveEditedTask = useCallback(
    (id: number) => {
      dispatch(TasksSagaActions.saveEditedTask(id));
    },
    [dispatch]
  );

  const handleCancelEdit = useCallback(() => {
    dispatch(TaskSliceActions.setEditingTask(null));
  }, [dispatch]);

  const handleClickAddTask = useCallback(() => {
    dispatch(TaskSliceActions.setVisibleForm(true));
  }, [dispatch]);

  const handleComplete = useCallback(
    (id: number) => {
      dispatch(TasksSagaActions.completeTask(id));
    },
    [dispatch]
  );

  const handleEdit = useCallback(
    (id: number) => {
      dispatch(TaskSliceActions.setEditingTask(id));
    },
    [dispatch]
  );

  const handlePageChange = useCallback(
    (event: ChangeEvent<unknown>, value: number) => {
      dispatch(TasksSagaActions.changePage(value));
    },
    [dispatch]
  );

  const handleSortFieldChange = useCallback(
    (event: SelectChangeEvent<keyof Task>) => {
      dispatch(
        TasksSagaActions.changeSortField(event.target.value as keyof Task)
      );
    },
    [dispatch]
  );

  const handleSortDirectionChange = useCallback(
    (event: SelectChangeEvent<SortDirection>) => {
      dispatch(
        TasksSagaActions.changeSortDirection(
          event.target.value as SortDirection
        )
      );
    },
    [dispatch]
  );

  return (
    <TaskList
      onPageChange={handlePageChange}
      onSortFieldChange={handleSortFieldChange}
      onSortDirectionChange={handleSortDirectionChange}
      onClickAddTask={handleClickAddTask}
      onSaveEditedTask={handleSaveEditedTask}
      onComplete={handleComplete}
      onCancelEdit={handleCancelEdit}
      onEdit={handleEdit}
    />
  );
};

export default Tasks;
