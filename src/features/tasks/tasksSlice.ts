import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';

interface Task {
  id: number;
}

interface InitState {
  taskList: Task[];
  isLoading: boolean;
  error: string;
}

const initialState: InitState = {
  taskList: [],
  isLoading: false,
  error: '',
};

export const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    setTasks: (state, action: PayloadAction<Task[]>) => {
      state.taskList = action.payload;
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
export const selectLoadingState = (state: RootState): boolean =>
  state.tasks.isLoading;
export const selectTasksError = (state: RootState): string => state.tasks.error;

export default tasksSlice.reducer;
