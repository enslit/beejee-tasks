import { Task } from './models/Task';

export enum TasksActionTypes {
  LoadTasks = 'LOAD_TASKS',
  ChangePage = 'TASK_CHANGE_PAGE',
  ChangeSortField = 'TASK_CHANGE_SORT_FIELD',
  ChangeSortDirection = 'TASK_CHANGE_SORT_DIRECTION',
  AddTask = 'ADD_TASK',
  ChangeTask = 'CHANGE_TASK',
}

const changePage = (page: number) => ({
  type: TasksActionTypes.ChangePage,
  payload: page,
});

const changeSortField = (field: keyof Task) => ({
  type: TasksActionTypes.ChangeSortField,
  payload: field,
});

const changeSortDirection = (direction: 'asc' | 'desc') => ({
  type: TasksActionTypes.ChangeSortDirection,
  payload: direction,
});

const addTask = () => ({
  type: TasksActionTypes.AddTask,
});

const completeTask = (id: number) => ({
  type: TasksActionTypes.ChangeTask,
  payload: { id, type: 'complete' },
});

const saveEditedTask = (id: number) => ({
  type: TasksActionTypes.ChangeTask,
  payload: { id, type: 'edit' },
});

export const TasksSagaActions = {
  changePage,
  changeSortField,
  changeSortDirection,
  addTask,
  completeTask,
  saveEditedTask,
};
