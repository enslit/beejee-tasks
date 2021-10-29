import React, { ChangeEvent, FC, useCallback, useRef } from 'react';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import {
  selectEditingTask,
  selectTasks,
  selectTasksError,
  selectTasksLoadingState,
  selectTasksPage,
  selectTasksSortDirection,
  selectTasksSortField,
  selectTasksVisibleForm,
  selectTotalTasks,
  TaskSliceActions,
} from '../tasksSlice';
import {
  Box,
  Collapse,
  Fab,
  FormControl,
  InputLabel,
  List,
  ListItem,
  MenuItem,
  Pagination,
  Paper,
  Select,
  SelectChangeEvent,
  Typography,
} from '@mui/material';
import TaskItem from './Task';
import { styled } from '@mui/material/styles';
import Stack from '@mui/material/Stack';
import { TasksSagaActions } from '../sagaActions';
import { TASK_PAGE_SIZE } from '../../../app/constants/app';
import { Task } from '../models/Task';
import { Add } from '@mui/icons-material';
import AddNewTaskForm from './AddNewTaskForm';

const ListRoot = styled(Box)(() => ({
  maxWidth: '700px',
  margin: '0 auto',
}));

const ListHead = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'base-line',
}));

const SortControls = styled(Box)(() => ({
  width: '250px',
  display: 'grid',
  gridTemplateColumns: '1fr 1fr',
  gridGap: '10px',
}));

const StyledList = styled(List, {
  shouldForwardProp: (prop) => prop !== 'isLoading',
})<{ isLoading: boolean }>(({ theme, isLoading }) => ({
  filter: isLoading ? 'blur(4px)' : 'none',
  transition: theme.transitions.create(['filter', 'height'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
}));

const StylePagination = {
  marginTop: '15px',
  display: 'flex',
  justifyContent: 'center',
};

const AddTaskButton = styled(Fab)(() => ({
  position: 'absolute',
  bottom: -20,
  left: '50%',
  zIndex: 100,
}));

const TaskList: FC = () => {
  const dispatch = useAppDispatch();
  const taskList = useAppSelector(selectTasks);
  const totalTasks = useAppSelector(selectTotalTasks);
  const isLoading = useAppSelector(selectTasksLoadingState);
  const error = useAppSelector(selectTasksError);
  const currentPage = useAppSelector(selectTasksPage);
  const sortField = useAppSelector(selectTasksSortField);
  const sortDirection = useAppSelector(selectTasksSortDirection);
  const isVisibleAddFrom = useAppSelector(selectTasksVisibleForm);
  const editingTask = useAppSelector(selectEditingTask);

  const addFormContainerRef = useRef<HTMLDivElement>(null);

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

  const handlePageChange = (event: ChangeEvent<unknown>, value: number) => {
    dispatch(TasksSagaActions.changePage(value));
  };

  const handleSortFieldChange = (event: SelectChangeEvent<keyof Task>) => {
    dispatch(
      TasksSagaActions.changeSortField(event.target.value as keyof Task)
    );
  };

  const handleSortDirectionChange = (
    event: SelectChangeEvent<'asc' | 'desc'>
  ) => {
    dispatch(
      TasksSagaActions.changeSortDirection(event.target.value as 'asc' | 'desc')
    );
  };

  return (
    <ListRoot>
      <ListHead elevation={3}>
        <Typography
          variant={'h6'}
          component={'div'}
          color={error ? 'error' : 'default'}
        >
          {isLoading
            ? 'Loading...'
            : !!error
            ? error
            : `Total tasks: ${totalTasks}`}
        </Typography>
        {taskList.length > 0 && (
          <SortControls>
            <FormControl>
              <InputLabel id="sortFieldLabel">Sort Field</InputLabel>
              <Select
                fullWidth
                size={'small'}
                labelId="sortFieldLabel"
                id="sortField"
                value={sortField}
                label="Sort Field"
                onChange={handleSortFieldChange}
              >
                {Object.keys(taskList[0]).map((field) => (
                  <MenuItem key={field} value={field}>
                    {field}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl>
              <InputLabel id="sortDirectionLabel">Sort Direction</InputLabel>
              <Select
                fullWidth
                size={'small'}
                labelId="sortDirectionLabel"
                id="sortDirection"
                value={sortDirection}
                label="Sort Direction"
                onChange={handleSortDirectionChange}
              >
                <MenuItem value={'desc'}>DESC</MenuItem>
                <MenuItem value={'asc'}>ASC</MenuItem>
              </Select>
            </FormControl>
          </SortControls>
        )}
      </ListHead>
      <Box
        sx={{
          position: 'relative',
        }}
        ref={addFormContainerRef}
      >
        <Collapse in={isVisibleAddFrom} timeout="auto" unmountOnExit>
          <AddNewTaskForm />
        </Collapse>
        {!isVisibleAddFrom && !isLoading && (
          <AddTaskButton
            color={'primary'}
            size={'small'}
            onClick={handleClickAddTask}
          >
            <Add />
          </AddTaskButton>
        )}
      </Box>
      {taskList.length > 0 && (
        <StyledList isLoading={isLoading}>
          {taskList.map((task) => (
            <ListItem key={task.id} divider={true}>
              <TaskItem
                isEditing={editingTask === task.id}
                task={task}
                onComplete={handleComplete}
                onEdit={handleEdit}
                onSave={handleSaveEditedTask}
                onCancel={handleCancelEdit}
              />
            </ListItem>
          ))}
        </StyledList>
      )}
      {totalTasks > 3 && (
        <Stack spacing={3}>
          <Pagination
            sx={StylePagination}
            page={currentPage}
            disabled={isLoading}
            count={Math.ceil(totalTasks / TASK_PAGE_SIZE)}
            onChange={handlePageChange}
          />
        </Stack>
      )}
    </ListRoot>
  );
};

export default TaskList;
