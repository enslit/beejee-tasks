export enum TasksActionTypes {
  LoadTasks = 'LOAD_TASKS',
}

const loadTasks = (page = 1) => ({
  type: TasksActionTypes.LoadTasks,
  payload: page,
});

export const TasksSagaActions = {
  loadTasks,
};
