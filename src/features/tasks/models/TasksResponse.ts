import { Task } from './Task';

export interface TasksResponse {
  tasks: Task[];
  total_task_count: number;
}
