import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { Task } from './models/Task';
import { TasksResponse } from './models/TasksResponse';
import { AddTaskForm } from './models/AddTaskForm';
import { SortDirection } from './models/SortDirection';

interface InitState {
  taskList: Task[];
  page: number;
  sort: keyof Task;
  sortDirection: SortDirection;
  total: number;
  isLoading: boolean;
  error: string;
  isVisibleAddForm: boolean;
  form: AddTaskForm;
  editingTask: null | number;
  editedText: string;
}

const createField = () => ({ value: '', error: '', touched: false });

const initForm: AddTaskForm = {
  username: createField(),
  email: createField(),
  text: createField(),
};

const initialState: InitState = {
  taskList: [],
  page: 1,
  sort: 'id',
  sortDirection: 'desc',
  total: 0,
  isLoading: false,
  error: '',
  isVisibleAddForm: false,
  form: initForm,
  editingTask: null,
  editedText: '',
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
    setPage: (state, action: PayloadAction<number>) => {
      state.page = action.payload;
    },
    setSortField: (state, action: PayloadAction<keyof Task>) => {
      state.sort = action.payload;
    },
    setSortDirection: (state, action: PayloadAction<SortDirection>) => {
      state.sortDirection = action.payload;
    },
    setVisibleForm: (state, action: PayloadAction<boolean>) => {
      state.isVisibleAddForm = action.payload;
      if (!action.payload) {
        state.form = initForm;
      }
    },
    setFieldsError: (
      state,
      action: PayloadAction<[keyof AddTaskForm, string][]>
    ) => {
      action.payload.forEach(([key, message]) => {
        state.form[key].error = message;
      });
    },
    setFieldTouched: (
      state,
      action: PayloadAction<{ field: keyof AddTaskForm; error: string }>
    ) => {
      state.form[action.payload.field].touched = true;
      state.form[action.payload.field].error = action.payload.error;
    },
    setFormField: (
      state,
      action: PayloadAction<{
        field: keyof AddTaskForm;
        value: string;
        error: string;
      }>
    ) => {
      state.form[action.payload.field].value = action.payload.value;
      state.form[action.payload.field].error = action.payload.error
        ? ''
        : action.payload.error;
    },
    setEditingTask: (state, action: PayloadAction<number | null>) => {
      state.editingTask = action.payload;
      if (action.payload) {
        const editingTask = state.taskList.find(
          (task) => task.id === action.payload
        );
        state.editedText = editingTask ? editingTask.text : '';
      } else {
        state.editedText = '';
      }
    },
    setEditedText: (state, action: PayloadAction<string>) => {
      state.editedText = action.payload;
    },
  },
});

export const TaskSliceActions = tasksSlice.actions;

export const selectTasks = (state: RootState): Task[] => state.tasks.taskList;
export const selectTotalTasks = (state: RootState): number => state.tasks.total;
export const selectTasksLoadingState = (state: RootState): boolean =>
  state.tasks.isLoading;
export const selectTasksError = (state: RootState): string => state.tasks.error;
export const selectTasksPage = (state: RootState): number => state.tasks.page;
export const selectTasksSortField = (state: RootState): keyof Task =>
  state.tasks.sort;
export const selectTasksSortDirection = (state: RootState): SortDirection =>
  state.tasks.sortDirection;
export const selectAddTaskForm = (state: RootState): AddTaskForm =>
  state.tasks.form;
export const selectTasksVisibleForm = (state: RootState): boolean =>
  state.tasks.isVisibleAddForm;
export const selectEditingTask = (state: RootState): number | null =>
  state.tasks.editingTask;
export const selectEditedText = (state: RootState): string =>
  state.tasks.editedText;

export default tasksSlice.reducer;
