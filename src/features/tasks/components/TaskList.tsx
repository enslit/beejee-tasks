import React, { ChangeEvent, FC, useRef } from 'react';
import { useAppSelector } from '../../../app/hooks';
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
} from '../tasksSlice';
import {
  Box,
  Collapse,
  FormControl,
  InputLabel,
  ListItem,
  MenuItem,
  Pagination,
  Select,
  SelectChangeEvent,
  Typography,
} from '@mui/material';
import TaskItem from './Task';
import Stack from '@mui/material/Stack';
import { TASK_PAGE_SIZE } from '../../../app/constants/app';
import { Task } from '../models/Task';
import { Add } from '@mui/icons-material';
import AddNewTaskForm from './AddNewTaskForm';
import Loader from '../../../components/Loader/Loader';
import ListRoot from '../styledComponents/ListRoot';
import ListHead from '../styledComponents/ListHead';
import SortControls from '../styledComponents/SortControls';
import AddTaskButton from '../styledComponents/AddTaskButton';
import StyledList from '../styledComponents/StyledList';
import { StylePagination } from '../styledComponents/StylePagination';
import { SortDirection } from '../models/SortDirection';

interface Props {
  onPageChange: (event: ChangeEvent<unknown>, value: number) => void;
  onSortFieldChange: (event: SelectChangeEvent<keyof Task>) => void;
  onSortDirectionChange: (event: SelectChangeEvent<SortDirection>) => void;
  onClickAddTask: () => void;
  onSaveEditedTask: (id: number) => void;
  onComplete: (id: number) => void;
  onCancelEdit: () => void;
  onEdit: (id: number) => void;
}

const TaskList: FC<Props> = (props) => {
  const {
    onSortFieldChange,
    onSortDirectionChange,
    onCancelEdit,
    onClickAddTask,
    onPageChange,
    onEdit,
    onSaveEditedTask,
    onComplete,
  } = props;

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
                onChange={onSortFieldChange}
                disabled={isLoading}
              >
                {Object.keys(taskList[0]).map((field) => (
                  <MenuItem
                    key={field}
                    value={field}
                    sx={{ textTransform: 'capitalize' }}
                  >
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
                onChange={onSortDirectionChange}
                disabled={isLoading}
              >
                <MenuItem value={'desc'}>Desc</MenuItem>
                <MenuItem value={'asc'}>Asc</MenuItem>
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
            onClick={onClickAddTask}
          >
            <Add />
          </AddTaskButton>
        )}
      </Box>
      {taskList.length > 0 && (
        <Box sx={{ position: 'relative' }}>
          <StyledList isLoading={isLoading}>
            {taskList.map((task) => (
              <ListItem key={task.id} divider={true}>
                <TaskItem
                  isEditing={editingTask === task.id}
                  task={task}
                  onComplete={onComplete}
                  onEdit={onEdit}
                  onSave={onSaveEditedTask}
                  onCancel={onCancelEdit}
                />
              </ListItem>
            ))}
          </StyledList>
          {isLoading && <Loader size={90} />}
        </Box>
      )}
      {totalTasks > 3 && (
        <Stack spacing={3}>
          <Pagination
            sx={StylePagination}
            page={currentPage}
            disabled={isLoading}
            count={Math.ceil(totalTasks / TASK_PAGE_SIZE)}
            onChange={onPageChange}
          />
        </Stack>
      )}
    </ListRoot>
  );
};

export default TaskList;
