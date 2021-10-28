import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { Task } from './models/Task';
import { TasksResponse } from './models/TasksResponse';

interface InitState {
  taskList: Task[];
  total: number;
  isLoading: boolean;
  error: string;
}

const initialState: InitState = {
  taskList: [],
  total: 0,
  isLoading: false,
  error: '',
};

export const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    setTasks: (state, action: PayloadAction<TasksResponse>) => {
      state.taskList = action.payload.tasks;
      state.total = action.payload.total_task_count;
    },
    setLoadingState: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
    },
    clearError: (state) => {
      state.error = '';
    },
  },
});

export const TaskSliceActions = tasksSlice.actions;

export const selectTasks = (state: RootState): Task[] => state.tasks.taskList;
export const selectTotalTasks = (state: RootState): number => state.tasks.total;
export const selectTasksLoadingState = (state: RootState): boolean =>
  state.tasks.isLoading;
export const selectTasksError = (state: RootState): string => state.tasks.error;

export default tasksSlice.reducer;
